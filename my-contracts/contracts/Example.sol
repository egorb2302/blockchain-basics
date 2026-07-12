// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Marketplace {
    error NotOwner();
    error NotSeller();
    error NotBuyer();
    error ItemNotListed();
    error ItemAlreadyListed();
    error InsufficientPayment();
    error InsufficientDeposit();
    error TransferFailed();
    error AlreadyDisputed();
    error NotDisputed();
    error OnlyArbiter();
    
    event ItemListed(
        uint256 indexed itemId,
        address indexed seller,
        uint256 price,
        uint256 deposit
    );
    
    event ItemPurchased(
        uint256 indexed itemId,
        address indexed buyer
    );
    
    event ItemDelivered(
        uint256 indexed itemId,
        address indexed buyer
    );
    
    event DisputeOpened(
        uint256 indexed itemId,
        address indexed by
    );
    
    event DisputeResolved(
        uint256 indexed itemId,
        bool buyerWon
    );
    
    event FundsWithdrawn(
        address indexed user,
        uint256 amount
    );
    
    enum Status {
        Listed,
        Purchased,
        Delivered,
        Disputed,
        Resolved,
        Cancelled
    }
    
    struct Item {
        uint256 id;
        address payable seller;
        address payable buyer;
        uint256 price;
        uint256 deposit;
        Status status;
        string name;
        string description;
        uint256 createdAt;
    }
    
    address public owner;
    address public arbiter;
    uint256 public platformFee;
    uint256 public nextItemId;
    uint256 public totalVolume;
    
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public pendingWithdrawals;
    
    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }
    
    modifier onlyArbiter() {
        if (msg.sender != arbiter) revert OnlyArbiter();
        _;
    }
    
    modifier itemExists(uint256 itemId) {
        if (items[itemId].id == 0) revert ItemNotListed();
        _;
    }
    
    constructor(address _arbiter, uint256 _platformFee) {
        owner = msg.sender;
        arbiter = _arbiter;
        platformFee = _platformFee;
    }

    function listItem(
        string calldata name,
        string calldata description,
        uint256 price,
        uint256 deposit
    ) 
        external 
        payable 
        returns (uint256) 
    {
        if (msg.value < deposit) revert InsufficientDeposit();
        if (price == 0) revert InsufficientPayment();
        
        uint256 itemId = ++nextItemId;
        
        items[itemId] = Item({
            id: itemId,
            seller: payable(msg.sender),
            buyer: payable(address(0)),
            price: price,
            deposit: deposit,
            status: Status.Listed,
            name: name,
            description: description,
            createdAt: block.timestamp
        });
        
        if (msg.value > deposit) {
            (bool refunded, ) = payable(msg.sender).call{value: msg.value - deposit}("");
            if (!refunded) revert TransferFailed();
        }
        
        emit ItemListed(itemId, msg.sender, price, deposit);
        return itemId;
    }

    function cancelListing(uint256 itemId) 
        external 
        itemExists(itemId) 
    {
        Item storage item = items[itemId];
        if (msg.sender != item.seller) revert NotSeller();
        if (item.status != Status.Listed) revert ItemAlreadyListed();
        
        item.status = Status.Cancelled;
        
        (bool success, ) = item.seller.call{value: item.deposit}("");
        if (!success) revert TransferFailed();
        
        emit ItemDelivered(itemId, item.seller);
    }
 
    function purchaseItem(uint256 itemId) 
        external 
        payable 
        itemExists(itemId) 
    {
        Item storage item = items[itemId];
        if (item.status != Status.Listed) revert ItemAlreadyListed();
        if (msg.value < item.price) revert InsufficientPayment();
        
        item.buyer = payable(msg.sender);
        item.status = Status.Purchased;
        
        if (msg.value > item.price) {
            (bool refunded, ) = payable(msg.sender).call{value: msg.value - item.price}("");
            if (!refunded) revert TransferFailed();
        }
        
        emit ItemPurchased(itemId, msg.sender);
    }

    function confirmDelivery(uint256 itemId) 
        external 
        itemExists(itemId) 
    {
        Item storage item = items[itemId];
        if (msg.sender != item.buyer) revert NotBuyer();
        if (item.status != Status.Purchased) revert ItemAlreadyListed();
        
        item.status = Status.Delivered;
        
        uint256 fee = (item.price * platformFee) / 10000;
        uint256 sellerPayout = item.price - fee;
        
        totalVolume += item.price;
    
        (bool sellerPaid, ) = item.seller.call{value: sellerPayout + item.deposit}("");
        if (!sellerPaid) revert TransferFailed();
        
        if (fee > 0) {
            pendingWithdrawals[owner] += fee;
        }
        
        emit ItemDelivered(itemId, item.buyer);
    }

    function openDispute(uint256 itemId) 
        external 
        itemExists(itemId) 
    {
        Item storage item = items[itemId];
        if (msg.sender != item.seller && msg.sender != item.buyer) {
            revert NotSeller();
        }
        if (item.status == Status.Disputed) revert AlreadyDisputed();
        if (item.status != Status.Purchased) revert ItemAlreadyListed();
        
        item.status = Status.Disputed;
        
        emit DisputeOpened(itemId, msg.sender);
    }

    function resolveDispute(uint256 itemId, bool buyerWon) 
        external 
        onlyArbiter 
        itemExists(itemId) 
    {
        Item storage item = items[itemId];
        if (item.status != Status.Disputed) revert NotDisputed();
        
        item.status = Status.Resolved;
        
        uint256 fee = (item.price * platformFee) / 10000;
        uint256 afterFee = item.price - fee;
        
        if (fee > 0) {
            pendingWithdrawals[owner] += fee;
        }
        
        if (buyerWon) {
            // Покупатель получает цену назад, продавец теряет депозит
            (bool buyerPaid, ) = item.buyer.call{value: item.price + item.deposit}("");
            if (!buyerPaid) revert TransferFailed();
        } else {
            // Продавец получает цену и депозит
            (bool sellerPaid, ) = item.seller.call{value: afterFee + item.deposit}("");
            if (!sellerPaid) revert TransferFailed();
        }
        
        emit DisputeResolved(itemId, buyerWon);
    }

    function setPlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Max fee is 10%"); // 1000 BPS = 10%
        platformFee = newFee;
    }
    
    function setArbiter(address newArbiter) external onlyOwner {
        arbiter = newArbiter;
    }
    
    function withdrawFees() external onlyOwner {
        uint256 amount = pendingWithdrawals[owner];
        if (amount == 0) revert InsufficientPayment();
        
        pendingWithdrawals[owner] = 0;
        
        (bool success, ) = payable(owner).call{value: amount}("");
        if (!success) revert TransferFailed();
        
        emit FundsWithdrawn(owner, amount);
    }

    function getItem(uint256 itemId) 
        external 
        view 
        returns (Item memory) 
    {
        return items[itemId];
    }
    
    function getItemCount() external view returns (uint256) {
        return nextItemId;
    }
    
    receive() external payable {
        revert("Use listItem or purchaseItem");
    }
}
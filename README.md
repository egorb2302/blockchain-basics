# Blockchain basics

Project was written like practice for my bc development.
This project will touch next topics:
- Smart-contracts
- RPC's
- ethers.js \ web3.js 
- Base
- Solidity syntax
- ERC20 working principles
- Work with MetaMask
- Work with Redhat Devnet

# How to run

If u finding that project interesting, u can run it and try by yourself:

## Contract Part

Before running all next code, insert that:

```
сd "my-contracts"
npm install / bun add
```

### Deploy Tested TTK Token

```
npx hardhat run scripts/deployToken.js
```

### Deploy Transaction Contract

```
npx hardhat run scripts/deployContract.js
```

### Run Devnet Nodes

```
npx hardhat node
```

### Compile Solidity Code, Get ABI

```
npx hardhat compile
```

## Frontend Part

```
cd "app"
bun install / npm i
bun run dev / npm run dev
```

See ya!

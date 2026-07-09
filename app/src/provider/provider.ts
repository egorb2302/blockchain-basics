import { ethers } from 'ethers';

console.log('window.ethereum at module load:', window.ethereum);
const provider = new ethers.BrowserProvider(window.ethereum);
console.log('provider created:', provider);

export default provider;

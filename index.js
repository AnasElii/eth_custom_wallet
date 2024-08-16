const ethers = require('ethers');

// Generate a new random wallet
const newWallet = ethers.Wallet.createRandom();

// Access the private key
const privateKey = newWallet.privateKey;
console.log("Private Key:", privateKey);

// Other wallet details
console.log("New Address:", newWallet.address);
console.log("Public Key:", newWallet.publicKey);
console.log("Mnemonic Phrase:", newWallet.mnemonic.phrase);

// Import an existing wallet using a private key
// const privateKey = 'your-private-key';
// const existingWallet = new ethers.Wallet(privateKey);
// console.log("Imported Address:", existingWallet.address);
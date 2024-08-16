const ethers = require('ethers');
require('dotenv').config();

const MySimpleToken = require('./artifacts/contracts/MySimpleToken.sol/MySimpleToken.json')

// Generate a new random wallet
// const newWallet = ethers.Wallet.createRandom();

// // Access the private key
// const privateKey = newWallet.privateKey;
// console.log("Private Key:", privateKey);

// // Other wallet details
// console.log("New Address:", newWallet.address);
// console.log("Public Key:", newWallet.publicKey);
// console.log("Mnemonic Phrase:", newWallet.mnemonic.phrase);

// Import an existing wallet using a private key
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const existingWallet = new ethers.Wallet(privateKey);
console.log("Imported Address:", existingWallet.address);

// INFURA Setup
// Replace with your Infura Project ID for the Sepolia testnet
const INFURA_PROJECT_ID = process.env.INFURA_API_KEY;

// Create a provider for the Sepolia testnet
const sepoliaProvider = new ethers.InfuraProvider('sepolia', INFURA_PROJECT_ID);

// Switch To Sepolia Testnet
//Connect the wallet to the Sepolia testnet
const wallet = existingWallet.connect(sepoliaProvider);

// now we can use the wallet to interact with sepolia testnet
console.log("Wallet Address:", wallet.address);

// Get the balance of the wallet
sepoliaProvider.getBalance(wallet.address).then((balance) => {
    console.log("Balance:", ethers.formatEther(balance));
}).catch((error) => {
    console.log("Error fetching balance:", error);
});

// Interact with ERC 20 Token
const tokenAddress = process.env.SEPOLIA_TOKEN_ADDRESS;

// ERC 20 Token Contract ABI
const MySimpleTokenABI = MySimpleToken.abi;

// Create a new contract instance
const tokenContract = new ethers.Contract(tokenAddress, MySimpleTokenABI, wallet);

async function getDecimals() {
    try {
        const decimals = await tokenContract.decimals();
        return decimals;
    } catch (error) {
        console.error("Error fetching decimals:", error);
    }
}

// Get Balance 
async function getBalance() {
    try {
        const decimals = await getDecimals(); // You can use the getDecimals function
        const balance = await tokenContract.balanceOf(wallet.address);
        console.log('Balance (raw):', balance);
        console.log('Balance (formatted):', ethers.formatUnits(balance, await getDecimals()));
        return balance;
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
}

// Transfer Tokens
async function transferTokens(toAddress, amount) {
    try {
        const decimals = await getDecimals();
        formatedAmount = ethers.parseUnits(amount, decimals);

        const tx = await tokenContract.transfer(toAddress, formatedAmount);
        console.log("Transaction Hash:", tx.hash);
        const receipt = await tx.wait();
        console.log("Transaction Receipt:", receipt);
    
    } catch (error) {
        console.error("Error transferring tokens:", error);
    }
}

// Test the function
getBalance();
transferTokens('0x9857E93f8421a6D3a09928AfCBb722e535B6634C', '100000');
getBalance();




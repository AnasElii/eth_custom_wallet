# Custom ERC-20 Wallet
## Overview
This project is a custom cryptocurrency wallet designed to interact with the ERC-20 token on the Ethereum blockchain. It allows users to securely send, receive, and withdraw tBoy tokens without relying on external wallet providers like MetaMask. The wallet is built using ethers.js and is currently configured to operate on the Sepolia testnet for development and testing.

## Features
- Account Management: Generate new wallets or import existing ones using private keys.
- Token Interactions: Send, receive, and check balances of ERC-20 tokens.
- Testnet Support: Interact with the Sepolia testnet to test functionality before deploying to the mainnet.
- Secure Storage: Implement best practices for securing private keys.
- User Interface: Basic console-based UI for interacting with the wallet.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js: Version 14 or higher.
- npm: Installed along with Node.js.
- Infura Account: Required to connect to the Ethereum network.
- ERC-20 Token Contract: Deployed on the Sepolia testnet.

## Installation
Clone the Repository:

```bash
git clone https://github.com/yourusername/custom-erc20-wallet.git
cd custom-erc20-wallet
Install Dependencies:
```

Install package:
```bash
npm install
```
### Set Up Environment Variables:
Create a .env file in the root directory with the following variables:

```bash
# Description: This file contains the environment variables for the project
#API KEYS
INFURA_API_KEY=your_infura_project_id

# Smart Contract Address
SEPOLIA_TOKEN_ADDRESS=your_token_contract_address

# Accounts --> Delete On Production
SEPOLIA_PRIVATE_KEY=your_wallet_private_key
SEPOLIA_SECENDARY_PRIVATE_KEY=your_2th_wallet_private_key
```

## Usage

### Generate a New Wallet
To generate a new wallet:

```javascript
const newWallet = ethers.Wallet.createRandom();
console.log("New Address:", newWallet.address);
console.log("Private Key:", newWallet.privateKey);
```
### Import an Existing Wallet
To import an existing wallet using a private key:

```javascript
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, sepoliaProvider);
```

### Check Wallet Balance
```javascript
async function checkBalance(wallet) {
    const balance = await sepoliaProvider.getBalance(wallet.address);
    console.log("Balance:", ethers.utils.formatEther(balance));
}
checkBalance(wallet);
```

### Interact with `ERC20` Token
#### Check Token Balance
```javascript
async function checkTokenBalance(walletAddress) {
    const balance = await tokenContract.balanceOf(walletAddress);
    console.log("Token Balance:", ethers.utils.formatUnits(balance, decimals));
}
checkTokenBalance(wallet.address);
```

#### Transfer Tokens
```javascript

async function transferTokens(recipientAddress, amount) {
    const tx = await tokenContract.transfer(recipientAddress, ethers.utils.parseUnits(amount, decimals));
    console.log("Transaction Hash:", tx.hash);
    await tx.wait(); // Wait for transaction to be minedconsole.log("Transfer Complete");
}
transferTokens('recipient_address', '10.0'); // Example: Transfer 10 tokens
```
## Testing on Sepolia
Deploy your ERC-20 token contract to the Sepolia testnet.
Use the wallet to interact with the contract, testing all the functionalities before moving to the mainnet.

## Security
Private Keys: Ensure private keys are stored securely. Never expose them in your code or share them.
Environment Variables: Keep sensitive information in the .env file and never commit it to your repository.

## Contributing
Contributions are welcome! Please fork the repository, create a branch for your feature or bug fix, and submit a pull request for review.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

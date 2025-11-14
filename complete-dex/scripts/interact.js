const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // give and sign users wallets
  const [signer] = await hre.ethers.getSigners();
  console.log("wallet is connected ", signer.address);
  
  // Balance 
  const balance = await signer.getBalance();
  console.log("Balance:", hre.ethers.utils.formatEther(balance), "ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

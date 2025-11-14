const hre = require("hardhat");

async function main() {
  const SimpleDex = await hre.ethers.getContractFactory("SimpleDex");
  
  //two token adress for example 
  const TOKEN1_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const TOKEN2_ADDRESS = "0xCf7Ed3Acca5a467e9e704C703E8D87F634fB0Fc9";
  
  const dex = await SimpleDex.deploy(TOKEN1_ADDRESS, TOKEN2_ADDRESS);
  await dex.deployed();
  
  console.log("DEX is deployed", dex.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

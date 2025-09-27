const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // 部署SimpleToken合约
  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const initialSupply = 1000000; // 1,000,000 tokens
  
  console.log("Deploying SimpleToken...");
  const token = await SimpleToken.deploy(initialSupply);
  
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log("SimpleToken deployed to:", tokenAddress);
  console.log("Initial supply:", initialSupply);
  console.log("Owner:", await token.owner());
  
  // 验证部署
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  
  console.log("\nToken Details:");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Decimals:", decimals);
  console.log("Total Supply:", ethers.formatEther(totalSupply), "STK");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
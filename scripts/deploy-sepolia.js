const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();

  console.log("=".repeat(50));
  console.log("🚀 开始部署到", network.name, "网络");
  console.log("=".repeat(50));
  console.log("部署账户:", deployer.address);
  
  // 获取账户余额
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("账户余额:", ethers.formatEther(balance), "ETH");
  
  // 检查余额是否足够（建议至少0.01 ETH用于gas费）
  if (parseFloat(ethers.formatEther(balance)) < 0.01) {
    console.log("⚠️  警告: 账户余额可能不足以支付gas费用");
    console.log("   建议至少有 0.01 ETH 用于部署");
    
    if (network.name === "sepolia") {
      console.log("   获取Sepolia测试ETH:");
      console.log("   - https://sepoliafaucet.com/");
      console.log("   - https://faucet.sepolia.dev/");
      console.log("   - https://www.alchemy.com/faucets/ethereum-sepolia");
    }
  }

  // 部署SimpleToken合约
  const SimpleToken = await ethers.getContractFactory("SimpleToken");
  const initialSupply = 1000000; // 1,000,000 tokens
  
  console.log("\n📝 正在部署 SimpleToken 合约...");
  console.log("初始供应量:", initialSupply.toLocaleString(), "tokens");
  
  // 估算gas费用
  const deployTx = await SimpleToken.getDeployTransaction(initialSupply);
  const estimatedGas = await deployer.estimateGas(deployTx);
  const gasPrice = await deployer.provider.getFeeData();
  
  console.log("预估Gas用量:", estimatedGas.toString());
  console.log("当前Gas价格:", ethers.formatUnits(gasPrice.gasPrice, "gwei"), "Gwei");
  console.log("预估部署费用:", ethers.formatEther(estimatedGas * gasPrice.gasPrice), "ETH");
  
  // 部署合约
  const token = await SimpleToken.deploy(initialSupply);
  console.log("\n⏳ 等待合约部署确认...");
  
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  
  console.log("\n🎉 合约部署成功!");
  console.log("=".repeat(50));
  console.log("合约地址:", tokenAddress);
  console.log("部署哈希:", token.deploymentTransaction().hash);
  console.log("区块号:", token.deploymentTransaction().blockNumber);
  
  // 验证部署结果
  console.log("\n📊 验证合约信息:");
  const name = await token.name();
  const symbol = await token.symbol();
  const decimals = await token.decimals();
  const totalSupply = await token.totalSupply();
  const owner = await token.owner();
  
  console.log("名称:", name);
  console.log("符号:", symbol);
  console.log("小数位:", decimals);
  console.log("总供应量:", ethers.formatEther(totalSupply), "STK");
  console.log("所有者:", owner);
  
  // 网络特定信息
  if (network.name === "sepolia") {
    console.log("\n🔗 Sepolia 测试网链接:");
    console.log("Etherscan:", `https://sepolia.etherscan.io/address/${tokenAddress}`);
    console.log("区块浏览器:", `https://sepolia.etherscan.io/tx/${token.deploymentTransaction().hash}`);
    
    console.log("\n📋 验证合约命令:");
    console.log(`npx hardhat verify --network sepolia ${tokenAddress} ${initialSupply}`);
  }
  
  // 保存部署信息到文件
  const deploymentInfo = {
    network: network.name,
    chainId: network.chainId,
    contractAddress: tokenAddress,
    deploymentHash: token.deploymentTransaction().hash,
    blockNumber: token.deploymentTransaction().blockNumber,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    contractName: "SimpleToken",
    initialSupply: initialSupply,
    gasUsed: estimatedGas.toString()
  };
  
  console.log("\n💾 部署信息已保存，可用于后续验证和交互");
  console.log("部署完成! 🎊");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 部署失败:");
    console.error(error);
    process.exit(1);
  });
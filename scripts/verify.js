const { run } = require("hardhat");

async function main() {
  // 配置你的合约地址和构造函数参数
  const contractAddress = process.env.CONTRACT_ADDRESS || "YOUR_CONTRACT_ADDRESS_HERE";
  const initialSupply = 1000000; // 与部署时使用的参数保持一致
  
  console.log("🔍 开始验证合约...");
  console.log("合约地址:", contractAddress);
  console.log("构造函数参数:", initialSupply);
  
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [initialSupply],
    });
    
    console.log("✅ 合约验证成功!");
    console.log(`🔗 查看验证结果: https://sepolia.etherscan.io/address/${contractAddress}#code`);
    
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("ℹ️  合约已经验证过了");
      console.log(`🔗 查看合约: https://sepolia.etherscan.io/address/${contractAddress}#code`);
    } else {
      console.error("❌ 验证失败:", error.message);
      
      // 提供一些常见问题的解决方案
      console.log("\n🔧 常见问题解决方案:");
      console.log("1. 确保 .env 文件中配置了正确的 ETHERSCAN_API_KEY");
      console.log("2. 确保合约地址正确");
      console.log("3. 确保构造函数参数与部署时一致");
      console.log("4. 等待几分钟后重试（有时需要等待区块确认）");
      console.log("5. 检查网络连接和Etherscan服务状态");
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
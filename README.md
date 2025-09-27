# Simple Token Contract

这是一个使用Solidity和Hardhat开发的简单代币合约项目。合约实现了基本的ERC20功能，包括转账、授权、铸造和销毁代币。

## 功能特性

- ✅ 基本的ERC20功能（转账、授权、余额查询）
- ✅ 代币铸造（仅限合约所有者）
- ✅ 代币销毁
- ✅ 所有权转移
- ✅ 事件记录
- ✅ 完整的测试覆盖
- ✅ Sepolia测试网部署支持

## 合约详情

- **合约名称**: SimpleToken
- **代币符号**: STK
- **小数位数**: 18
- **初始供应量**: 可在部署时设定

## 快速开始

### 环境要求

- Node.js >= 16.0
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 配置环境变量

1. 复制环境变量模板：
```bash
npm run setup
# 或手动复制
cp .env.example .env
```

2. 编辑 `.env` 文件，填入以下信息：

```bash
# 必需：你的钱包私钥（不要包含0x前缀）
PRIVATE_KEY=your_private_key_without_0x

# 必需：Sepolia RPC URL（选择一个）
SEPOLIA_URL=https://sepolia.infura.io/v3/your_infura_project_id
# 或使用 Alchemy: https://eth-sepolia.g.alchemy.com/v2/your_alchemy_api_key
# 或使用免费RPC: https://rpc.sepolia.org

# 可选：用于合约验证
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 编译合约

```bash
npm run compile
```

### 运行测试

```bash
npm run test
```

运行测试并生成gas报告：

```bash
npm run test:gas
```

## 部署到Sepolia测试网

### 准备工作

1. **获取测试ETH**: 
   - [Sepolia Faucet](https://sepoliafaucet.com/)
   - [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
   - [Sepolia Dev Faucet](https://faucet.sepolia.dev/)

2. **获取RPC URL**:
   - **Infura**: 注册 [Infura](https://infura.io/)，创建项目获取API Key
   - **Alchemy**: 注册 [Alchemy](https://alchemy.com/)，创建应用获取API Key
   - **免费RPC**: 使用 `https://rpc.sepolia.org`（不稳定）

3. **获取Etherscan API Key** (可选，用于合约验证):
   - 访问 [Etherscan APIs](https://etherscan.io/apis)
   - 注册并创建免费API Key

### 部署步骤

1. **部署合约**:
```bash
npm run deploy:sepolia
```

2. **验证合约** (可选):
```bash
# 方法1：使用脚本验证
CONTRACT_ADDRESS=0x你的合约地址 npm run verify:sepolia

# 方法2：直接使用hardhat验证
npm run verify:contract 0x你的合约地址 1000000
```

### 部署到本地网络

1. 启动本地节点：
```bash
npm run node
```

2. 在新终端中部署：
```bash
npm run deploy:local
```

## 可用的NPM脚本

| 脚本 | 描述 |
|------|------|
| `npm run compile` | 编译合约 |
| `npm run test` | 运行测试 |
| `npm run test:gas` | 运行测试并生成gas报告 |
| `npm run node` | 启动本地Hardhat节点 |
| `npm run deploy:local` | 部署到本地网络 |
| `npm run deploy:sepolia` | 部署到Sepolia测试网 |
| `npm run verify:sepolia` | 验证Sepolia上的合约 |
| `npm run verify:contract` | 直接验证合约（需要地址参数） |
| `npm run clean` | 清理编译文件 |
| `npm run setup` | 快速设置环境变量文件 |

## 测试覆盖

项目包含全面的测试用例，覆盖以下功能：

- 合约部署和初始化
- 代币转账
- 授权和代理转账
- 代币铸造和销毁
- 所有权管理
- 事件触发
- 错误处理

## 项目结构

```
├── contracts/
│   └── SimpleToken.sol         # 主合约文件
├── scripts/
│   ├── deploy.js              # 本地部署脚本
│   ├── deploy-sepolia.js      # Sepolia部署脚本
│   └── verify.js              # 合约验证脚本
├── test/
│   └── SimpleToken.test.js    # 测试文件
├── hardhat.config.js          # Hardhat配置
├── package.json              # 项目配置
├── .env.example             # 环境变量示例
└── README.md               # 项目说明
```

## 主要合约函数

### 公共函数

- `transfer(address to, uint256 value)` - 转账代币
- `approve(address spender, uint256 value)` - 授权代币使用
- `transferFrom(address from, address to, uint256 value)` - 代理转账
- `burn(uint256 value)` - 销毁代币

### 所有者专用函数

- `mint(address to, uint256 value)` - 铸造代币
- `transferOwnership(address newOwner)` - 转移所有权

## 常见问题

### Q: 部署时提示余额不足？
A: 确保你的钱包在Sepolia测试网有足够的ETH。使用上面提到的水龙头获取测试ETH。

### Q: RPC连接失败？
A: 检查你的 `SEPOLIA_URL` 配置是否正确，或尝试使用不同的RPC提供商。

### Q: 合约验证失败？
A: 确保 `ETHERSCAN_API_KEY` 配置正确，并且合约已经完全部署（等待几个区块确认）。

### Q: 私钥格式错误？
A: 私钥不应包含 `0x` 前缀，直接粘贴64位十六进制字符串。

## 安全注意事项

- **永远不要将真实私钥提交到版本控制系统**
- 仅在测试网使用测试私钥
- 合约包含基本的安全检查
- 使用 `onlyOwner` 修饰符保护敏感函数
- 事件记录确保操作透明性

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 联系方式

如有问题，请通过GitHub Issues联系。
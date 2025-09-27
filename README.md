# Simple Token Contract

这是一个使用Solidity和Hardhat开发的简单代币合约项目。合约实现了基本的ERC20功能，包括转账、授权、铸造和销毁代币。

## 功能特性

- ✅ 基本的ERC20功能（转账、授权、余额查询）
- ✅ 代币铸造（仅限合约所有者）
- ✅ 代币销毁
- ✅ 所有权转移
- ✅ 事件记录
- ✅ 完整的测试覆盖

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

复制 `.env.example` 为 `.env` 并填入相应的配置：

```bash
cp .env.example .env
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

### 部署合约

#### 部署到本地网络

1. 启动本地节点：
```bash
npm run node
```

2. 在新终端中部署：
```bash
npm run deploy:local
```

#### 部署到测试网

修改 `hardhat.config.js` 中的网络配置，然后运行：

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

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
│   └── SimpleToken.sol      # 主合约文件
├── scripts/
│   └── deploy.js           # 部署脚本
├── test/
│   └── SimpleToken.test.js # 测试文件
├── hardhat.config.js       # Hardhat配置
├── package.json           # 项目配置
└── README.md             # 项目说明
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

## 安全注意事项

- 合约包含基本的安全检查（零地址检查、余额检查等）
- 使用 `onlyOwner` 修饰符保护敏感函数
- 事件记录确保操作透明性

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 联系方式

如有问题，请通过GitHub Issues联系。
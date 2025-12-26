# 安装说明

## 依赖安装

由于 npm 权限问题，请按照以下步骤安装项目依赖：

### 方法 1: 修复 npm 权限（推荐）

```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
npm install
```

### 方法 2: 使用 legacy-peer-deps

```bash
npm install --legacy-peer-deps
```

### 方法 3: 使用 pnpm 或 yarn

```bash
# 使用 pnpm
npm install -g pnpm
pnpm install

# 或使用 yarn
npm install -g yarn
yarn install
```

## 必需的依赖包

本项目需要安装以下依赖：

```json
{
  "dependencies": {
    "@google/genai": "^1.34.0",
    "next": "15.4.10",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.4.5",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.6",
    "typescript": "^5"
  }
}
```

## 验证安装

安装完成后，运行以下命令验证：

```bash
npm run dev
```

如果看到 `✓ Ready in XXXms`，说明安装成功！

## 故障排除

### 错误: EACCES permission denied

这是 npm 缓存权限问题。解决方法：

```bash
# 清理 npm 缓存
npm cache clean --force

# 修复权限
sudo chown -R $(id -u):$(id -g) ~/.npm

# 重新安装
npm install
```

### 错误: peer dependency warnings

这些警告通常不影响运行。如果遇到问题，使用：

```bash
npm install --legacy-peer-deps
```

### 错误: Module not found

确保已安装所有依赖：

```bash
rm -rf node_modules package-lock.json
npm install
```

## 下一步

安装完成后：

1. 配置环境变量：`cp .env.example .env.local`
2. 添加 Gemini API Key 到 `.env.local`
3. 运行开发服务器：`npm run dev`

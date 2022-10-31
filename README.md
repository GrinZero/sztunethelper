# sztunethelper

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
nvm use 16
pnpm config set electron_mirror "https://npm.taobao.org/mirrors/electron/"
pnpm config set strict-peer-dependencies false
pnpm config set auto-install-peers true
pnpm install
```

### Development

```bash
$ npm run dev
```

- command+options+I或者Ctrl+Shit+I打开调试器
- command+R强制刷新

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

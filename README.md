# personal-profilee

## Personal Introduction
我目前是一个后端工程师，目前在字节跳动实用 Golang 进行后端开发工作，目前正在探索独立开发的方法和SOP，期望能够做一些有价值有意义的万战去帮助到其他人。

## 项目介绍

一个现代化的个人博客网站，使用 HTML、Tailwind CSS 和 JavaScript 构建。

### 项目特点

- 响应式设计，适配各种设备
- 暗色模式支持
- 现代化的 UI 设计
- 流畅的动画效果
- 组件化结构

## 本地运行指南

### 前提条件

- Node.js (推荐 v16 或更高版本)
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm start
# 或
yarn start
```

开发服务器将在 http://localhost:3000 启动。

## Vercel 部署指南

### 方法一：使用 Vercel Dashboard（推荐）

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 "New Project"
3. 导入你的 GitHub 仓库
4. 配置部署选项：
   - Framework Preset: 选择 "Other"
   - Build Command: 留空（静态网站无需构建）
   - Output Directory: 留空（使用根目录）
5. 点击 "Deploy"

### 方法二：使用 Vercel CLI

1. 安装 Vercel CLI：
   ```bash
   npm install -g vercel
   ```

2. 登录 Vercel：
   ```bash
   vercel login
   ```

3. 部署项目：
   ```bash
   vercel
   ```

4. 根据提示完成部署

## 项目结构

```
personal-profile/
├── assets/          # 静态资源
├── components/      # 可复用组件
├── css/            # 样式文件
├── js/             # JavaScript 文件
├── index.html      # 首页
├── about.html      # 关于页面
├── blog.html       # 博客页面
├── portfolio.html  # 作品集页面
├── gallery.html    # 相册页面
├── contact.html    # 联系页面
├── package.json    # 项目配置
└── README.md       # 项目说明
```

## 技术栈

- HTML5
- Tailwind CSS
- JavaScript (ES6+)
- Font Awesome
- Live Server (开发环境)

## 许可证

MIT License
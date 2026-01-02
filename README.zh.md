# Champ Code Academy - 导师门户前端实现

## 项目概述
本项目是为 Champ Code Academy 设计并实现的导师门户前端系统，旨在为导师提供登录、课程日程查看、可接课程认领等核心功能。系统遵循现代化 UI/UX 设计规范，结合高性能的前端技术栈，实现了流畅的交互体验和完善的业务功能。

## 在线预览
✅ 已部署至 GitHub Pages：[https://coder-dmcqt.github.io/ui-frontend-test_champcodeacademy888/](https://coder-dmcqt.github.io/ui-frontend-test_champcodeacademy888/)

## 核心功能实现
### 1. 基础功能（满足所有核心需求）
- **登录页面**：模拟登录验证，登录后自动跳转至导师仪表盘
- **仪表盘核心模块**：
    - 历史课程（已完成）
    - 即将到来的课程
    - 可认领课程（含「认领课程」操作按钮）
    - 今日课程
- **课程卡片展示**：完整展示日期、时间、学生列表、课程科目、课程类型等信息
- **日期筛选功能**：默认按月份分组展示课程，支持日期范围筛选，筛选后课程列表动态重渲染

### 2. 技术实现亮点
- **API 交互层**：使用 ServiceWorker + MSW 拦截请求，基于原生 Fetch 实现清晰的请求结构，优雅处理请求/响应
- **数据持久化**：基于 IndexedDB 实现课程数据和用户状态持久化，提升离线体验
- **状态管理**：集成 Zustand 实现状态管理并支持持久化，保证数据流向可预测
- **样式实现**：全量使用 Styled Components 开发，无第三方 UI 库依赖，界面符合西方审美标准，视觉层级清晰
- **交互体验**：
    - 实现明暗模式切换
    - 路由跳转/Loading/课程卡片均添加流畅动画过渡
    - 自定义 Message/Notification 组件，提供友好的操作反馈

### 3. 技术栈
- 框架：Next.js + TypeScript
- 样式：Styled Components
- 状态管理：Zustand（带持久化）
- API 模拟：MSW + ServiceWorker
- 数据持久化：IndexedDB
- 动画：CSS 过渡 + 关键帧动画

## 项目部署与运行
### 环境要求
- Node.js >= 16.x
- npm/yarn/pnpm

### 安装与启动
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run start
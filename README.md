# Vue3 后台管理系统

基于 Vue3 + TypeScript + Vite 构建的现代化后台管理系统，提供完整的权限控制、数据可视化和业务管理功能。

## 功能特性

### 权限控制体系
- ✅ 动态路由控制：基于 vue-router 导航守卫与 Pinia 实现页面级权限控制
- ✅ 按钮级权限：封装全局自定义指令 `v-has`，实现细粒度权限控制
- ✅ 登录验证：支持用户名密码登录，自动保存登录状态

### 数据可视化
- ✅ 数据大屏：统计卡片、销售趋势、地域分布、排行榜等
- ✅ ECharts 图表：支持柱状图、折线图、饼图等多种图表类型

### 业务管理模块
- ✅ 用户管理：用户列表、添加、编辑、删除、状态管理
- ✅ 角色管理：角色列表、权限配置、角色删除
- ✅ 权限管理：权限列表展示、模块筛选
- ✅ 商品管理：商品列表、搜索筛选、上下架管理
- ✅ 品牌管理：品牌卡片展示、状态管理

### 系统设置
- ✅ 个人中心：个人信息编辑、密码修改
- ✅ 系统设置：主题切换、系统信息展示
- ✅ 深色模式：支持浅色/深色主题切换，自动保存偏好

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.3+ | 渐进式 JavaScript 框架 |
| TypeScript | 5.3+ | 类型安全的 JavaScript 超集 |
| Vite | 4.5+ | 下一代前端构建工具 |
| Vue Router | 4.2+ | Vue 官方路由管理器 |
| Pinia | 2.1+ | Vue 官方状态管理库 |
| Tailwind CSS | 3.4+ | 原子化 CSS 框架 |
| ECharts | 5.4+ | 强大的数据可视化图表库 |

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看效果。

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 公共组件
├── directives/          # 自定义指令
│   └── has.ts           # v-has 权限指令
├── layout/              # 布局组件
│   └── index.vue        # 主布局（侧边栏 + 头部）
├── router/              # 路由配置
│   └── index.ts         # 路由定义与守卫
├── stores/              # Pinia 状态管理
│   └── auth.ts          # 认证与权限状态
├── views/               # 页面视图
│   ├── login/           # 登录页面
│   ├── dashboard/       # 数据大屏
│   ├── users/           # 用户管理
│   ├── roles/           # 角色管理
│   ├── permissions/     # 权限管理
│   ├── products/        # 商品管理
│   ├── brands/          # 品牌管理
│   ├── profile/         # 个人中心
│   └── settings/        # 系统设置
├── App.vue              # 根组件
├── main.ts              # 应用入口
└── style.css            # 全局样式
```

## 权限控制

### 路由权限
在路由配置中设置 `meta.requiresAuth: true` 来标记需要认证的路由：

```typescript
{
  path: '/dashboard',
  name: 'Dashboard',
  meta: { title: '数据大屏', requiresAuth: true },
  component: () => import('@/views/dashboard/index.vue')
}
```

### 按钮权限
使用 `v-has` 指令控制按钮级权限：

```vue
<button v-has="'user:add'">新增用户</button>
```

## 测试账号

| 用户名 | 密码 | 角色 | 权限 |
|--------|------|------|------|
| admin | 123456 | 管理员 | 全部权限 |
| user | 123456 | 普通用户 | 仅查看权限 |

## 开发规范

- 使用 TypeScript 进行类型检查
- 组件命名采用 PascalCase
- 函数命名采用 camelCase
- 使用 ESLint 进行代码检查
- 提交信息遵循 Conventional Commits 规范

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

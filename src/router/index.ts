import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }
]

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: '数据大屏', icon: 'monitor', requiresAuth: true },
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/users',
        name: 'Users',
        meta: { title: '用户管理', icon: 'users', requiresAuth: true },
        component: () => import('@/views/users/index.vue')
      },
      {
        path: '/roles',
        name: 'Roles',
        meta: { title: '角色管理', icon: 'shield', requiresAuth: true },
        component: () => import('@/views/roles/index.vue')
      },
      {
        path: '/permissions',
        name: 'Permissions',
        meta: { title: '权限管理', icon: 'key', requiresAuth: true },
        component: () => import('@/views/permissions/index.vue')
      },
      {
        path: '/products',
        name: 'Products',
        meta: { title: '商品管理', icon: 'package', requiresAuth: true },
        component: () => import('@/views/products/index.vue')
      },
      {
        path: '/brands',
        name: 'Brands',
        meta: { title: '品牌管理', icon: 'building', requiresAuth: true },
        component: () => import('@/views/brands/index.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', requiresAuth: true },
        component: () => import('@/views/profile/index.vue')
      },
      {
        path: '/settings',
        name: 'Settings',
        meta: { title: '系统设置', icon: 'settings', requiresAuth: true },
        component: () => import('@/views/settings/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.path === '/login') {
    next()
    return
  }

  if (!authStore.token) {
    next('/login')
    return
  }

  if (!authStore.hasRoutes) {
    await authStore.generateRoutes()
    next({ ...to, replace: true })
    return
  }

  next()
})

export { asyncRoutes }
export default router

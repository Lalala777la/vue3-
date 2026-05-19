import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router, { asyncRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

export interface UserInfo {
  id: number
  username: string
  name: string
  avatar: string
  roles: string[]
  permissions: string[]
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)
  const hasRoutes = ref(false)
  const theme = ref<'light' | 'dark'>('light')

  const roles = computed(() => userInfo.value?.roles || [])
  const permissions = computed(() => userInfo.value?.permissions || [])

  function login(username: string, password: string) {
    const mockUser: UserInfo = {
      id: 1,
      username: username,
      name: username === 'admin' ? '管理员' : '普通用户',
      avatar: '',
      roles: username === 'admin' ? ['admin'] : ['user'],
      permissions: username === 'admin' 
        ? ['user:list', 'user:add', 'user:edit', 'user:delete', 'role:list', 'role:add', 'role:edit', 'role:delete', 'permission:list', 'product:list', 'product:add', 'product:edit', 'product:delete', 'brand:list', 'brand:add', 'brand:edit', 'brand:delete']
        : ['user:list', 'product:list', 'brand:list']
    }
    
    token.value = 'mock-token-' + Date.now()
    userInfo.value = mockUser
    localStorage.setItem('token', token.value)
    localStorage.setItem('userInfo', JSON.stringify(mockUser))
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    hasRoutes.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    router.push('/login')
  }

  function generateRoutes() {
    const accessibleRoutes = filterRoutes(asyncRoutes)
    accessibleRoutes.forEach(route => {
      router.addRoute(route)
    })
    hasRoutes.value = true
  }

  function filterRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    return routes.filter(route => {
      if (route.meta?.requiresAuth) {
        const permission = route.meta?.permission as string
        if (permission && !permissions.value.includes(permission)) {
          return false
        }
      }
      if (route.children) {
        route.children = filterRoutes(route.children)
      }
      return true
    })
  }

  function hasPermission(permission: string): boolean {
    return permissions.value.includes(permission)
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', theme.value)
    updateTheme()
  }

  function updateTheme() {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function initAuth() {
    const savedToken = localStorage.getItem('token')
    const savedUserInfo = localStorage.getItem('userInfo')
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'

    if (savedToken) {
      token.value = savedToken
    }
    if (savedUserInfo) {
      userInfo.value = JSON.parse(savedUserInfo)
    }
    if (savedTheme) {
      theme.value = savedTheme
    }
    updateTheme()
  }

  return {
    token,
    userInfo,
    hasRoutes,
    theme,
    roles,
    permissions,
    login,
    logout,
    generateRoutes,
    hasPermission,
    toggleTheme,
    initAuth
  }
})

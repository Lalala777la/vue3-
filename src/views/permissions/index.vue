<script setup lang="ts">
import { ref } from 'vue'

interface Permission {
  id: number
  key: string
  label: string
  description: string
  module: string
}

const permissions = ref<Permission[]>([
  { id: 1, key: 'user:list', label: '用户列表', description: '查看用户列表', module: '用户管理' },
  { id: 2, key: 'user:add', label: '添加用户', description: '添加新用户', module: '用户管理' },
  { id: 3, key: 'user:edit', label: '编辑用户', description: '编辑用户信息', module: '用户管理' },
  { id: 4, key: 'user:delete', label: '删除用户', description: '删除用户', module: '用户管理' },
  { id: 5, key: 'role:list', label: '角色列表', description: '查看角色列表', module: '角色管理' },
  { id: 6, key: 'role:add', label: '添加角色', description: '添加新角色', module: '角色管理' },
  { id: 7, key: 'role:edit', label: '编辑角色', description: '编辑角色信息', module: '角色管理' },
  { id: 8, key: 'role:delete', label: '删除角色', description: '删除角色', module: '角色管理' },
  { id: 9, key: 'permission:list', label: '权限列表', description: '查看权限列表', module: '权限管理' },
  { id: 10, key: 'product:list', label: '商品列表', description: '查看商品列表', module: '商品管理' },
  { id: 11, key: 'product:add', label: '添加商品', description: '添加新商品', module: '商品管理' },
  { id: 12, key: 'product:edit', label: '编辑商品', description: '编辑商品信息', module: '商品管理' },
  { id: 13, key: 'product:delete', label: '删除商品', description: '删除商品', module: '商品管理' },
  { id: 14, key: 'brand:list', label: '品牌列表', description: '查看品牌列表', module: '品牌管理' },
  { id: 15, key: 'brand:add', label: '添加品牌', description: '添加新品牌', module: '品牌管理' },
  { id: 16, key: 'brand:edit', label: '编辑品牌', description: '编辑品牌信息', module: '品牌管理' },
  { id: 17, key: 'brand:delete', label: '删除品牌', description: '删除品牌', module: '品牌管理' },
])

const searchQuery = ref('')
const selectedModule = ref('all')

const modules = computed(() => {
  const uniqueModules = ['all', ...new Set(permissions.value.map(p => p.module))]
  return uniqueModules
})

import { computed } from 'vue'

const filteredPermissions = computed(() => {
  return permissions.value.filter(p => {
    const matchesSearch = p.key.includes(searchQuery.value) || p.label.includes(searchQuery.value)
    const matchesModule = selectedModule.value === 'all' || p.module === selectedModule.value
    return matchesSearch && matchesModule
  })
})

const groupedPermissions = computed(() => {
  const groups: Record<string, Permission[]> = {}
  filteredPermissions.value.forEach(p => {
    if (!groups[p.module]) {
      groups[p.module] = []
    }
    groups[p.module].push(p)
  })
  return groups
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">权限管理</h1>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="relative flex-1 max-w-md">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索权限"
              class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <select 
            v-model="selectedModule"
            class="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white"
          >
            <option value="all">全部模块</option>
            <option v-for="module in modules.slice(1)" :key="module" :value="module">{{ module }}</option>
          </select>
        </div>
      </div>
      
      <div class="p-6 space-y-6">
        <div v-for="(items, module) in groupedPermissions" :key="module">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{{ module }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="perm in items" 
              :key="perm.id"
              class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-gray-900 dark:text-white">{{ perm.label }}</span>
                <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-blue-100 rounded-full">{{ perm.key }}</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ perm.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

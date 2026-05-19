<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

interface User {
  id: number
  username: string
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

const users = ref<User[]>([
  { id: 1, username: 'admin', name: '管理员', email: 'admin@example.com', phone: '13800138000', role: '管理员', status: 'active', createdAt: '2024-01-01' },
  { id: 2, username: 'user1', name: '张三', email: 'user1@example.com', phone: '13800138001', role: '普通用户', status: 'active', createdAt: '2024-01-02' },
  { id: 3, username: 'user2', name: '李四', email: 'user2@example.com', phone: '13800138002', role: '普通用户', status: 'inactive', createdAt: '2024-01-03' },
  { id: 4, username: 'user3', name: '王五', email: 'user3@example.com', phone: '13800138003', role: '普通用户', status: 'active', createdAt: '2024-01-04' },
  { id: 5, username: 'user4', name: '赵六', email: 'user4@example.com', phone: '13800138004', role: '普通用户', status: 'active', createdAt: '2024-01-05' },
  { id: 6, username: 'user5', name: '孙七', email: 'user5@example.com', phone: '13800138005', role: '普通用户', status: 'inactive', createdAt: '2024-01-06' },
  { id: 7, username: 'user6', name: '周八', email: 'user6@example.com', phone: '13800138006', role: '普通用户', status: 'active', createdAt: '2024-01-07' },
  { id: 8, username: 'user7', name: '吴九', email: 'user7@example.com', phone: '13800138007', role: '普通用户', status: 'active', createdAt: '2024-01-08' },
])

const searchQuery = ref('')
const currentPage = ref(1)
const pageSize = ref(5)

const filteredUsers = computed(() => {
  return users.value.filter(user => 
    user.username.includes(searchQuery.value) ||
    user.name.includes(searchQuery.value) ||
    user.email.includes(searchQuery.value)
  )
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / pageSize.value))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredUsers.value.slice(start, start + pageSize.value)
})

function deleteUser(id: number) {
  if (confirm('确定要删除该用户吗？')) {
    users.value = users.value.filter(user => user.id !== id)
  }
}

function toggleStatus(id: number) {
  const user = users.value.find(u => u.id === id)
  if (user) {
    user.status = user.status === 'active' ? 'inactive' : 'active'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">用户管理</h1>
      <button 
        v-has="'user:add'"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
      >
        <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        新增用户
      </button>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <div class="relative flex-1">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索用户名、姓名或邮箱"
              class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">用户名</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">姓名</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">邮箱</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">角色</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">创建时间</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in paginatedUsers" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-100 dark:bg-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 dark:text-white font-medium">{{ user.name.charAt(0) }}</span>
                  </div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-white">{{ user.username }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-100">{{ user.role }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', user.status === 'active' ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100']">
                  {{ user.status === 'active' ? '活跃' : '禁用' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ user.createdAt }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <button 
                    v-has="'user:edit'"
                    class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    title="编辑"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="toggleStatus(user.id)"
                    class="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                    :title="user.status === 'active' ? '禁用' : '启用'"
                  >
                    <svg v-if="user.status === 'active'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </button>
                  <button 
                    v-has="'user:delete'"
                    @click="deleteUser(user.id)"
                    class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="删除"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span class="text-sm text-gray-500 dark:text-gray-400">
          显示 {{ ((currentPage - 1) * pageSize) + 1 }} - {{ Math.min(currentPage * pageSize, filteredUsers.length) }} 条，共 {{ filteredUsers.length }} 条
        </span>
        <div class="flex items-center space-x-2">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一页
          </button>
          <span class="text-sm text-gray-500 dark:text-gray-400">{{ currentPage }} / {{ totalPages }}</span>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

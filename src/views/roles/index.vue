<script setup lang="ts">
import { ref } from 'vue'

interface Role {
  id: number
  name: string
  description: string
  permissions: string[]
  createdAt: string
}

const roles = ref<Role[]>([
  { id: 1, name: '管理员', description: '系统管理员，拥有全部权限', permissions: ['user:list', 'user:add', 'user:edit', 'user:delete', 'role:list', 'role:add', 'role:edit', 'role:delete', 'permission:list', 'product:list', 'product:add', 'product:edit', 'product:delete', 'brand:list', 'brand:add', 'brand:edit', 'brand:delete'], createdAt: '2024-01-01' },
  { id: 2, name: '普通用户', description: '普通运营用户，拥有基础权限', permissions: ['user:list', 'product:list', 'brand:list'], createdAt: '2024-01-02' },
  { id: 3, name: '商品管理员', description: '负责商品管理', permissions: ['product:list', 'product:add', 'product:edit', 'product:delete', 'brand:list', 'brand:add', 'brand:edit', 'brand:delete'], createdAt: '2024-01-03' },
])

const searchQuery = ref('')
const showModal = ref(false)
const editingRole = ref<Role | null>(null)

const availablePermissions = [
  { key: 'user:list', label: '用户列表' },
  { key: 'user:add', label: '添加用户' },
  { key: 'user:edit', label: '编辑用户' },
  { key: 'user:delete', label: '删除用户' },
  { key: 'role:list', label: '角色列表' },
  { key: 'role:add', label: '添加角色' },
  { key: 'role:edit', label: '编辑角色' },
  { key: 'role:delete', label: '删除角色' },
  { key: 'permission:list', label: '权限列表' },
  { key: 'product:list', label: '商品列表' },
  { key: 'product:add', label: '添加商品' },
  { key: 'product:edit', label: '编辑商品' },
  { key: 'product:delete', label: '删除商品' },
  { key: 'brand:list', label: '品牌列表' },
  { key: 'brand:add', label: '添加品牌' },
  { key: 'brand:edit', label: '编辑品牌' },
  { key: 'brand:delete', label: '删除品牌' },
]

function deleteRole(id: number) {
  if (confirm('确定要删除该角色吗？')) {
    roles.value = roles.value.filter(role => role.id !== id)
  }
}

function editRole(role: Role) {
  editingRole.value = { ...role }
  showModal.value = true
}

function saveRole() {
  if (editingRole.value) {
    const index = roles.value.findIndex(r => r.id === editingRole.value?.id)
    if (index !== -1) {
      roles.value[index] = { ...editingRole.value }
    }
  }
  showModal.value = false
  editingRole.value = null
}

function togglePermission(permission: string) {
  if (editingRole.value) {
    const index = editingRole.value.permissions.indexOf(permission)
    if (index === -1) {
      editingRole.value.permissions.push(permission)
    } else {
      editingRole.value.permissions.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">角色管理</h1>
      <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
        <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        新增角色
      </button>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="relative flex-1 max-w-md">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索角色名称"
            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
        </div>
      </div>
      
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div 
          v-for="role in roles" 
          :key="role.id"
          class="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ role.name }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ role.description }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                @click="editRole(role)"
                class="px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-600 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500 transition-colors"
              >
                编辑权限
              </button>
              <button 
                @click="deleteRole(role.id)"
                class="px-3 py-1 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-500 transition-colors"
              >
                删除
              </button>
            </div>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <span 
              v-for="perm in role.permissions" 
              :key="perm"
              class="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
            >
              {{ availablePermissions.find(p => p.key === perm)?.label || perm }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div 
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showModal = false"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">编辑角色权限</h2>
          <button 
            @click="showModal = false"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div v-if="editingRole">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">角色名称</label>
            <input 
              v-model="editingRole.name"
              type="text"
              class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">角色描述</label>
            <textarea 
              v-model="editingRole.description"
              rows="2"
              class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white"
            ></textarea>
          </div>
          
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">权限列表</label>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="perm in availablePermissions" 
                :key="perm.key"
                @click="togglePermission(perm.key)"
                :class="[
                  'px-3 py-1 text-sm rounded-full transition-colors',
                  editingRole.permissions.includes(perm.key) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ perm.label }}
              </button>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button 
              @click="showModal = false"
              class="px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              取消
            </button>
            <button 
              @click="saveRole"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

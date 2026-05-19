<script setup lang="ts">
import { ref, computed } from 'vue'

interface Brand {
  id: number
  name: string
  logo: string
  description: string
  products: number
  status: 'active' | 'inactive'
  createdAt: string
}

const brands = ref<Brand[]>([
  { id: 1, name: '华为', logo: 'H', description: '华为技术有限公司', products: 120, status: 'active', createdAt: '2024-01-01' },
  { id: 2, name: '苹果', logo: 'A', description: 'Apple Inc.', products: 80, status: 'active', createdAt: '2024-01-02' },
  { id: 3, name: '三星', logo: 'S', description: 'Samsung Electronics', products: 150, status: 'active', createdAt: '2024-01-03' },
  { id: 4, name: '联想', logo: 'L', description: 'Lenovo Group', products: 95, status: 'active', createdAt: '2024-01-04' },
  { id: 5, name: '雷蛇', logo: 'R', description: 'Razer Inc.', products: 60, status: 'active', createdAt: '2024-01-05' },
  { id: 6, name: '罗技', logo: 'G', description: 'Logitech', products: 75, status: 'inactive', createdAt: '2024-01-06' },
])

const searchQuery = ref('')

const filteredBrands = computed(() => {
  return brands.value.filter(b => 
    b.name.includes(searchQuery.value) || b.description.includes(searchQuery.value)
  )
})

function deleteBrand(id: number) {
  if (confirm('确定要删除该品牌吗？')) {
    brands.value = brands.value.filter(b => b.id !== id)
  }
}

function toggleStatus(id: number) {
  const brand = brands.value.find(b => b.id === id)
  if (brand) {
    brand.status = brand.status === 'active' ? 'inactive' : 'active'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">品牌管理</h1>
      <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
        <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        新增品牌
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="brand in filteredBrands" 
        :key="brand.id"
        :class="[
          'bg-white dark:bg-gray-800 rounded-xl shadow-sm border transition-all duration-200',
          brand.status === 'active' ? 'border-gray-200 dark:border-gray-700' : 'border-gray-300 dark:border-gray-600 opacity-75'
        ]"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white text-xl font-bold">{{ brand.logo }}</span>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ brand.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ brand.products }} 件商品</p>
              </div>
            </div>
            <span :class="['px-2 py-1 text-xs font-semibold rounded-full', brand.status === 'active' ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100']">
              {{ brand.status === 'active' ? '启用' : '禁用' }}
            </span>
          </div>
          
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{{ brand.description }}</p>
          
          <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <span class="text-xs text-gray-400">创建于 {{ brand.createdAt }}</span>
            <div class="flex items-center space-x-2">
              <button 
                class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                title="编辑"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                @click="toggleStatus(brand.id)"
                class="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                :title="brand.status === 'active' ? '禁用' : '启用'"
              >
                <svg v-if="brand.status === 'active'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </button>
              <button 
                @click="deleteBrand(brand.id)"
                class="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="删除"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

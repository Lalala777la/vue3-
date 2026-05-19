<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

interface Product {
  id: number
  name: string
  brand: string
  category: string
  price: number
  stock: number
  sales: number
  status: 'active' | 'inactive'
  createdAt: string
}

const products = ref<Product[]>([
  { id: 1, name: '无线蓝牙耳机', brand: '华为', category: '电子产品', price: 299, stock: 500, sales: 1234, status: 'active', createdAt: '2024-01-01' },
  { id: 2, name: '智能手表', brand: '苹果', category: '电子产品', price: 2999, stock: 200, sales: 567, status: 'active', createdAt: '2024-01-02' },
  { id: 3, name: '机械键盘', brand: '雷蛇', category: '电子产品', price: 899, stock: 300, sales: 890, status: 'active', createdAt: '2024-01-03' },
  { id: 4, name: '无线鼠标', brand: '罗技', category: '电子产品', price: 199, stock: 800, sales: 2345, status: 'active', createdAt: '2024-01-04' },
  { id: 5, name: '显示器', brand: '三星', category: '电子产品', price: 1599, stock: 150, sales: 345, status: 'inactive', createdAt: '2024-01-05' },
  { id: 6, name: '笔记本电脑', brand: '联想', category: '电子产品', price: 5999, stock: 100, sales: 123, status: 'active', createdAt: '2024-01-06' },
  { id: 7, name: '游戏耳机', brand: '金士顿', category: '电子产品', price: 499, stock: 250, sales: 678, status: 'active', createdAt: '2024-01-07' },
  { id: 8, name: '固态硬盘', brand: '西部数据', category: '电子产品', price: 399, stock: 400, sales: 1567, status: 'active', createdAt: '2024-01-08' },
])

const searchQuery = ref('')
const selectedBrand = ref('all')

const brands = computed(() => {
  return ['all', ...new Set(products.value.map(p => p.brand))]
})

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.includes(searchQuery.value) || p.category.includes(searchQuery.value)
    const matchesBrand = selectedBrand.value === 'all' || p.brand === selectedBrand.value
    return matchesSearch && matchesBrand
  })
})

function deleteProduct(id: number) {
  if (confirm('确定要删除该商品吗？')) {
    products.value = products.value.filter(p => p.id !== id)
  }
}

function toggleStatus(id: number) {
  const product = products.value.find(p => p.id === id)
  if (product) {
    product.status = product.status === 'active' ? 'inactive' : 'active'
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">商品管理</h1>
      <button 
        v-has="'product:add'"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
      >
        <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        新增商品
      </button>
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
              placeholder="搜索商品名称或分类"
              class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>
          <select 
            v-model="selectedBrand"
            class="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white"
          >
            <option value="all">全部品牌</option>
            <option v-for="brand in brands.slice(1)" :key="brand" :value="brand">{{ brand }}</option>
          </select>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">商品名称</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">品牌</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">分类</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">价格</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">库存</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">销量</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-purple-100 dark:bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-600 dark:text-purple-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                  <span class="ml-3 text-sm font-medium text-gray-900 dark:text-white">{{ product.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{{ product.brand }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ product.category }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">¥{{ product.price.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['text-sm font-medium', product.stock < 100 ? 'text-red-500' : 'text-gray-900 dark:text-white']">
                  {{ product.stock }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ product.sales }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', product.status === 'active' ? 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100' : 'bg-red-100 dark:bg-red-600 text-red-800 dark:text-red-100']">
                  {{ product.status === 'active' ? '上架' : '下架' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <button 
                    v-has="'product:edit'"
                    class="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                    title="编辑"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="toggleStatus(product.id)"
                    class="p-2 text-gray-400 hover:text-yellow-500 transition-colors"
                    :title="product.status === 'active' ? '下架' : '上架'"
                  >
                    <svg v-if="product.status === 'active'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </button>
                  <button 
                    v-has="'product:delete'"
                    @click="deleteProduct(product.id)"
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
    </div>
  </div>
</template>

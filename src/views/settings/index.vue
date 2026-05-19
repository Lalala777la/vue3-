<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const settings = ref({
  siteName: 'Vue3后台管理系统',
  siteLogo: '',
  theme: authStore.theme,
  sidebarCollapsed: false,
  showBreadcrumb: true,
  showFooter: true
})

function saveSettings() {
  if (settings.value.theme !== authStore.theme) {
    authStore.toggleTheme()
  }
  alert('设置已保存')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">系统设置</h1>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">基本设置</h2>
          </div>
          
          <div class="p-6 space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">系统名称</label>
              <input 
                v-model="settings.siteName"
                type="text" 
                class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">主题模式</label>
              <div class="flex items-center space-x-4">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    v-model="settings.theme"
                    type="radio" 
                    value="light"
                    class="w-4 h-4 text-blue-500 focus:ring-blue-500"
                  />
                  <span class="text-gray-700 dark:text-gray-300">浅色模式</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    v-model="settings.theme"
                    type="radio" 
                    value="dark"
                    class="w-4 h-4 text-blue-500 focus:ring-blue-500"
                  />
                  <span class="text-gray-700 dark:text-gray-300">深色模式</span>
                </label>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">显示面包屑</label>
                <button 
                  @click="settings.showBreadcrumb = !settings.showBreadcrumb"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.showBreadcrumb ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  ]"
                >
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    settings.showBreadcrumb ? 'translate-x-6' : 'translate-x-1'
                  ]"></span>
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">显示页脚</label>
                <button 
                  @click="settings.showFooter = !settings.showFooter"
                  :class="[
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                    settings.showFooter ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  ]"
                >
                  <span :class="[
                    'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                    settings.showFooter ? 'translate-x-6' : 'translate-x-1'
                  ]"></span>
                </button>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button 
                @click="saveSettings"
                class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
              >
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">系统信息</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">系统版本</span>
              <span class="text-gray-900 dark:text-white font-medium">1.0.0</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">框架版本</span>
              <span class="text-gray-900 dark:text-white font-medium">Vue 3.4.x</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">构建工具</span>
              <span class="text-gray-900 dark:text-white font-medium">Vite 5.x</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">样式框架</span>
              <span class="text-gray-900 dark:text-white font-medium">Tailwind CSS 3.x</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">图标库</span>
              <span class="text-gray-900 dark:text-white font-medium">Lucide Icons</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">图表库</span>
              <span class="text-gray-900 dark:text-white font-medium">ECharts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

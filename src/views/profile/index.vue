<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const form = ref({
  name: authStore.userInfo?.name || '',
  email: '',
  phone: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const activeTab = ref('profile')

function saveProfile() {
  alert('个人信息已更新')
}

function changePassword() {
  if (!form.value.oldPassword) {
    alert('请输入旧密码')
    return
  }
  if (!form.value.newPassword) {
    alert('请输入新密码')
    return
  }
  if (form.value.newPassword !== form.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  alert('密码已修改')
  form.value.oldPassword = ''
  form.value.newPassword = ''
  form.value.confirmPassword = ''
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">个人中心</h1>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex flex-col items-center">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <span class="text-white text-3xl font-bold">{{ authStore.userInfo?.name.charAt(0) }}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ authStore.userInfo?.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ authStore.userInfo?.username }}</p>
            <div class="mt-4 flex items-center space-x-2">
              <span class="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-600 text-blue-600 dark:text-blue-100 rounded-full">
                {{ authStore.userInfo?.roles.join(', ') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              @click="activeTab = 'profile'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-medium transition-colors',
                activeTab === 'profile' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-600' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              个人信息
            </button>
            <button 
              @click="activeTab = 'password'"
              :class="[
                'flex-1 px-6 py-4 text-sm font-medium transition-colors',
                activeTab === 'password' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 bg-blue-50 dark:bg-blue-600' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              ]"
            >
              修改密码
            </button>
          </div>
          
          <div class="p-6">
            <form v-if="activeTab === 'profile'" @submit.prevent="saveProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">用户名</label>
                  <input 
                    type="text" 
                    :value="authStore.userInfo?.username"
                    disabled
                    class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">姓名</label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">邮箱</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    placeholder="请输入邮箱"
                    class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">手机号</label>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    placeholder="请输入手机号"
                    class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>
              
              <div class="flex justify-end">
                <button 
                  type="submit"
                  class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  保存修改
                </button>
              </div>
            </form>
            
            <form v-else @submit.prevent="changePassword" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">旧密码</label>
                <input 
                  v-model="form.oldPassword"
                  type="password" 
                  placeholder="请输入旧密码"
                  class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">新密码</label>
                <input 
                  v-model="form.newPassword"
                  type="password" 
                  placeholder="请输入新密码"
                  class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">确认密码</label>
                <input 
                  v-model="form.confirmPassword"
                  type="password" 
                  placeholder="请再次输入新密码"
                  class="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              
              <div class="flex justify-end">
                <button 
                  type="submit"
                  class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  修改密码
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

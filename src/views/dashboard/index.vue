<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef1 = ref<HTMLDivElement | null>(null)
const chartRef2 = ref<HTMLDivElement | null>(null)
const chartRef3 = ref<HTMLDivElement | null>(null)

let chart1: echarts.ECharts | null = null
let chart2: echarts.ECharts | null = null
let chart3: echarts.ECharts | null = null

const stats = ref([
  { label: '用户总数', value: 12840, change: '+12.5%', color: 'blue' },
  { label: '商品数量', value: 3580, change: '+8.3%', color: 'green' },
  { label: '订单金额', value: 156800, change: '+23.6%', color: 'purple' },
  { label: '品牌数量', value: 128, change: '-2.1%', color: 'orange' }
])

const recentOrders = ref([
  { id: 'ORD001', customer: '张三', amount: 2340, status: '已完成', time: '2024-01-15 14:30' },
  { id: 'ORD002', customer: '李四', amount: 1560, status: '处理中', time: '2024-01-15 14:25' },
  { id: 'ORD003', customer: '王五', amount: 890, status: '待付款', time: '2024-01-15 14:20' },
  { id: 'ORD004', customer: '赵六', amount: 3450, status: '已完成', time: '2024-01-15 14:15' },
  { id: 'ORD005', customer: '孙七', amount: 1230, status: '已取消', time: '2024-01-15 14:10' }
])

function initCharts() {
  if (chartRef1.value) {
    chart1 = echarts.init(chartRef1.value)
    chart1.setOption({
      title: { text: '月度销售趋势', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['销售额', '订单数'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
      xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
      yAxis: [{ type: 'value', name: '销售额' }, { type: 'value', name: '订单数' }],
      series: [
        { name: '销售额', type: 'bar', data: [12000, 19000, 15000, 23000, 18000, 28000] },
        { name: '订单数', type: 'line', yAxisIndex: 1, data: [320, 450, 380, 520, 480, 620] }
      ]
    })
  }

  if (chartRef2.value) {
    chart2 = echarts.init(chartRef2.value)
    chart2.setOption({
      title: { text: '用户地域分布', left: 'center' },
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [{
        name: '用户分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false, position: 'center' },
        emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold' } },
        labelLine: { show: false },
        data: [
          { value: 3350, name: '华东' },
          { value: 2780, name: '华南' },
          { value: 1980, name: '华北' },
          { value: 1450, name: '西南' },
          { value: 980, name: '西北' },
          { value: 1300, name: '华中' }
        ]
      }]
    })
  }

  if (chartRef3.value) {
    chart3 = echarts.init(chartRef3.value)
    chart3.setOption({
      title: { text: '销售排行TOP10', left: 'center' },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: { type: 'value' },
      yAxis: { 
        type: 'category', 
        data: ['商品J', '商品I', '商品H', '商品G', '商品F', '商品E', '商品D', '商品C', '商品B', '商品A'] 
      },
      series: [{
        name: '销量',
        type: 'bar',
        data: [1200, 1350, 1580, 1680, 1890, 2100, 2350, 2580, 2890, 3200],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        }
      }]
    })
  }
}

function handleResize() {
  chart1?.resize()
  chart2?.resize()
  chart3?.resize()
}

onMounted(() => {
  initCharts()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart1?.dispose()
  chart2?.dispose()
  chart3?.dispose()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">数据大屏</h1>
      <div class="flex items-center space-x-2">
        <span class="text-gray-500 dark:text-gray-400 text-sm">{{ new Date().toLocaleDateString('zh-CN') }}</span>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="stat in stats" 
        :key="stat.label"
        class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div class="flex items-center justify-between">
          <p class="text-gray-500 dark:text-gray-400 text-sm">{{ stat.label }}</p>
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', {
            'bg-blue-100': stat.color === 'blue',
            'bg-green-100': stat.color === 'green',
            'bg-purple-100': stat.color === 'purple',
            'bg-orange-100': stat.color === 'orange'
          }]">
            <svg class="w-5 h-5" :class="{
              'text-blue-500': stat.color === 'blue',
              'text-green-500': stat.color === 'green',
              'text-purple-500': stat.color === 'purple',
              'text-orange-500': stat.color === 'orange'
            }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="stat.color === 'blue'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              <path v-else-if="stat.color === 'green'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
              <path v-else-if="stat.color === 'purple'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
        </div>
        <div class="mt-4">
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ stat.value.toLocaleString() }}
          </p>
          <p :class="['text-sm mt-1', stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500']">
            {{ stat.change }}
          </p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div ref="chartRef1" class="h-80"></div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div ref="chartRef2" class="h-80"></div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div ref="chartRef3" class="h-80"></div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">最近订单</h3>
        <div class="space-y-4">
          <div 
            v-for="order in recentOrders" 
            :key="order.id"
            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <p class="font-medium text-gray-900 dark:text-white">{{ order.id }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ order.customer }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">{{ order.amount.toLocaleString() }}</p>
              <span :class="['text-xs px-2 py-1 rounded-full', {
                'bg-green-100 text-green-800': order.status === '已完成',
                'bg-yellow-100 text-yellow-800': order.status === '处理中',
                'bg-orange-100 text-orange-800': order.status === '待付款',
                'bg-red-100 text-red-800': order.status === '已取消'
              }]">
                {{ order.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

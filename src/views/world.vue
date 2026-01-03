<template>
  <!-- 图表容器：设置宽度和高度 -->
  <div ref="chartRef" style="width: 600px; height: 400px;"></div>
  <RelationGraph />
</template>
 
<script setup>
// 引入 Vue 的 Composition API
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 引入 echarts 库
import * as echarts from 'echarts'
 import RelationGraph from '../components/RelationGraph.vue'
// 获取 DOM 元素的引用（用于初始化图表）
const chartRef = ref(null)
// 存储 ECharts 实例
let chartInstance = null
 
// 初始化图表的方法
const initChart = () => {
  if (chartRef.value) {
    // 初始化 echarts 实例
    chartInstance = echarts.init(chartRef.value)
 
    // 配置项
    const option = {
      title: {
        text: 'Vue3 中使用 ECharts' // 图表标题
      },
      tooltip: {}, // 默认提示框配置
      legend: {
        data: ['销量'] // 图例名称
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'] // X 轴数据
      },
      yAxis: {}, // Y 轴默认配置
      series: [
        {
          name: '销量', // 系列名称
          type: 'bar', // 图表类型为柱状图
          data: [5, 20, 36, 10, 10, 20] // 数据值
        }
      ]
    }
 
    // 使用配置项渲染图表
    chartInstance.setOption(option)
  }
}
 
// 窗口大小变化时调整图表尺寸
const resizeChart = () => {
  chartInstance?.resize()
}
 
// 组件挂载后执行初始化
onMounted(() => {
  initChart()
  // 监听窗口大小变化事件以支持响应式
  window.addEventListener('resize', resizeChart)
})
 
// 组件卸载前清理资源，防止内存泄漏
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose() // 销毁 echarts 实例
})

</script>
<template>
  <div ref="chartRef" class="relation-graph"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import aa from '@/images/screenshot.png'
import { getNodes,getFamily } from '../api/api'

const chartRef = ref(null)
const node = ref([])
let chartInstance = null

const initGraph = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)

  const option = {
    title: {
      text: '五节点关系图',
      left: 'center'
    },
    tooltip: {},
    series: [
      {
        name: '关系',
        type: 'graph',
        layout: 'none',
        symbolSize: 50,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}',
          show:true
        },
        draggable: true,
        edges: [],
        data: node.value
      }
    ]
  }

  chartInstance.setOption(option)
}

const resizeChart = () => chartInstance?.resize()

onMounted(async () => {
  // 从接口加载节点并赋值给 node 的 .value，确保保持响应式
  node.value = await getFamily()
  console.log(node.value[0])

  // 在数据准备好后初始化图表并添加窗口尺寸监听器
  initGraph()
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  chartInstance?.dispose()
})
</script>

<style scoped>
.relation-graph {
  width: 100%;
  height: 400px;
}
</style>

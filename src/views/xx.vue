<template>
  <div id="test">
    <div id="part">
      <!-- <button @click="initNetwork()"></button> -->
      <div id="mynetwork"></div>
      <div id="chart"></div>
    </div>
    <div id="part">
      <textarea id="answer" ></textarea>
      <input v-model="message" label="ask:" placeholder="sss" id="question" >
      <button id="commit" >sss</button>
    </div>
  </div>
</template>

<script>
import { Network, DataSet } from 'vis'
import * as echart from 'echarts'
import { getNodes,getLinks,getTest2 } from '../api/api';
export default {
  data() {
    return {    
      message:'',  
      options: {
        groups:{
            node1:{
              color:'blue',
              shape:'dot'
            },
            node2:{
              color:'yellow',
              shape:'circle'
            }
          },
        nodes: {
          font: { color: 'red' }
          
        },
        edges:{
          arrows:'to'
        }
      }
    }; 
  },
  mounted() {
    this.initNetwork();
    
    // 间隔5秒改变知识图谱
    // setTimeout(() => {
    //   this.initNetwork()
    // }, 5000);
    this.initTimeline()
  },
  methods: {
    async initNetwork() {
      const container = document.getElementById('mynetwork');
      const node=await getNodes().then(res=>{
        return res
      })
      const edge=await getLinks().then(res=>{        
        return res
      })
      
      const data = {
        nodes: new DataSet(node),
        edges: new DataSet(edge)
      };
      this.network = new Network(container, data, this.options);
      // console.log(data)
      
    },
    initTimeline() {
      // 创建一个时间轴
      const element = echart.init(document.getElementById('chart'))
      
      const options = { 
        timeline:{
          data:[
            'xxx','qq','dd'
          ]
        }
       }

      element.setOption(options)
    }
  }
}
</script>
<style>
#mynetwork{
  height: 300px;
}
#chart{
  height: 200px;
}
#answer {
  border-color: red;
  width: 500px;
  height: 500px;
}
#question{
  
  width: 400px;
  margin: 10px;
}
#test {
  display: flex;
}
#part{
  width: 50%;
}
#commit{
  margin: 10px;
  background-color: red;
}
</style>
import { createRouter, createWebHashHistory } from 'vue-router'
import myvue from '../views/myvue.vue'
import person from '../views/person.vue'
import home from '../views/home.vue'
import test from '../views/test.vue'
import world from '../views/world.vue'
import network from '../views/network.vue'
import testnet from '../views/testnet.vue'
import about from '../views/about.vue'
import uploadCsv from '../views/uploadCsv.vue'
import xx from '../views/xx.vue'
import yy from '../views/yy.vue'
import zz from '../views/zz.vue'
import RelationGraph from '../components/RelationGraph.vue'
// 定义路由表
const routes = [
  {name: 'home', path: '/', component: home},
  {name: 'person', path: '/person', component: person},
  {name: 'myvue', path: '/myvue', component: myvue},
  {name: 'test',path: '/test',component: test},
  {name: 'world',path: '/world',component: world},
  {name: 'network',path: '/network',component: network},
  {name: 'testnet',path: '/testnet',component: testnet},
  {name: 'about',path: '/about',component: about},
  {name: 'uploadCsv', path: '/upload-csv', component: uploadCsv},
  {name: 'yy',path: '/yy',component: yy},
  {name: 'xx',path: '/xx',component: xx},
  {name: 'zz',path: '/zz',component: zz},
  {name: 'RelationGraph',path: '/RelationGraph',component: RelationGraph}
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes //路由表
})

export default router

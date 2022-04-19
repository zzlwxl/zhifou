import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css' // 默认样式 npm install normalize.css
import './assets/css/index.less' //自定义默认样式
const app=createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')

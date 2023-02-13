import { createApp } from 'vue'
import App from './App.vue'
import './assets/sass/main.scss'
import router from './routes/index'
createApp(App).use(router).mount('#app')

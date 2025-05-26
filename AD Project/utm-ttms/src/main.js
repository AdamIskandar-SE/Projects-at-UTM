import App from '@/App.vue'
import router from '@/router'
import '@/styles/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

// Create Vue application
const app = createApp(App)

// Create Pinia store
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)

// Mount application
app.mount('#app')
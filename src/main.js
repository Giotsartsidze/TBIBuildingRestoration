import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import your router
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)
app.use(router) // Register the router with your app
app.mount('#app')
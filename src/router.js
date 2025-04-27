import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ServiceDetail from './views/ServiceDetail.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/service/:id',
        name: 'service-detail',
        component: ServiceDetail,
        props: true
    }
]

const router = createRouter({
    // In Vite, use import.meta.env instead of process.env
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth'
            }
        } else {
            return { top: 0 }
        }
    }
})

export default router
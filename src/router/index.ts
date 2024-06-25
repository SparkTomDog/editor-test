import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: "/tiptap",
        name: "TipTap",
        component: () => import("../components/TipTap/testTemplate.vue")
    },
    {
        path: "/",
        redirect: {
            name: "TipTap"
        },
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})
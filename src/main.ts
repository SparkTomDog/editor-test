import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import "./assets/index.scss"
import { router } from './router'
import { FontAwesomeIcon } from './plugins/fontawesome'

const app = createApp(App)
app.component("font-awesome-icon", FontAwesomeIcon)
app.use(router)
app.mount('#app')

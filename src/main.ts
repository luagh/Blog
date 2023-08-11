import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
<<<<<<< HEAD
import store from 'store'
const app = createApp(App)

app.use(router)
app.use(store)
=======

const app = createApp(App)

app.use(router)
>>>>>>> 15c501eca111e704deeee2d11dc3bf0767825cee


app.mount('#app')

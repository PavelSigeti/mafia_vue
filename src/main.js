import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import {io} from "socket.io-client";

const socket = io("http://localhost:8000/");

window.socket = socket;

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

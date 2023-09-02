import './assets/main.css'
import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(VueDiff);
app.mount('#app')

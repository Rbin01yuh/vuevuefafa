import { createApp } from 'vue'
import { VueVueVafa } from 'vuevuefafa'
import 'vuevuefafa/dist/style.css'
import App from './App.vue'

const app = createApp(App)

// Install vuevuefafa with custom theme
app.use(VueVueVafa, {
  // Optionally customize theme
  // theme: {
  //   primary: '#8b5cf6',
  // },
})

app.mount('#app')

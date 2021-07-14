import { createApp } from 'vue'

import App from './App'

const app = createApp(App)


 if (!document.getElementById("root")) {
  const div = document.createElement('div');
  div.id = "root";
  document.body.appendChild(div);
}
app.mount('#root')
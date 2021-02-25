import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VModal from 'vue-js-modal'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGolfBall } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

library.add(faGolfBall);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI);
Vue.use(VModal, { dialog: true })
Vue.config.productionTip = false

Vue.prototype.$buildAxiosInstance = () => {
  return axios.create({
    // baseURL: 'http://localhost:3050/',
    baseURL: 'https://golf-class-backend.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

Vue.prototype.$showErrorDialog = (vueInstance, errorMessage) => {
  vueInstance.$modal.show('dialog',{
      title: '錯誤訊息',
      text:  errorMessage,
      buttons: [
        {
          title: '確認',
          handler: () => {
              vueInstance.$modal.hide('dialog');
          }
        }
      ]
  });
}

new Vue({
  render: h => h(App),
}).$mount('#app')


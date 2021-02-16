import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setRem from "@/utils/reminit";
import imgShow from '@/components/imgShow'
import { sdkConfig } from "@/utils/wx-sdk-config";
import Toasted from "vue-toasted"
import "animate.css"

Vue.use(imgShow);
Vue.use(Toasted, { position: "top-center", duration: 1500, className: "toast-class", containerClass: "toast-class" })


setRem();

Vue.config.productionTip = false;



sdkConfig().then(WX => {
  Vue.prototype.$WX = WX;

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});



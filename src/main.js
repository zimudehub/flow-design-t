import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FlowDesignTCD from '../object'
// import FlowDesignTCD from 'flow-design-tcd'
// import 'flow-design-tcd/lib/flow-design-tcd.css'
import {
  Form,
  FormItem,
  Input,
} from 'element-ui'
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(FlowDesignTCD);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

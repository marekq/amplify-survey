import Vue from 'vue'
import App from "./App.vue";
import '@aws-amplify/ui-vue';
import router from './router';
import VueRouter from 'vue-router';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");

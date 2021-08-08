import { createApp } from 'vue';
import App from "./App.vue";
import '@aws-amplify/ui-components';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { applyPolyfills, defineCustomElements } from "@aws-amplify/ui-components/loader";
  applyPolyfills().then(() => {
    defineCustomElements(window);
  });

createApp(App).use(router).mount("#app");

import './bootstrap';

import { createApp } from 'vue';
import store from './store'
import router from './routes/index'
//https://avil13.github.io/vue-sweetalert2/
import VueSweetalert2 from "vue-sweetalert2";
//https://laravel-vue-pagination.org/guide/components/bootstrap-5.html
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
//https://vue-select.org/guide/values.html#getting-and-setting
import vSelect from "vue-select";

// css
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-select/dist/vue-select.css';

const app = createApp({});

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.component('Pagination', Bootstrap5Pagination)
app.component("v-select", vSelect);
app.mount('#app')

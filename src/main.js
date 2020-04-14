import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/jquery.min'
import './assets/bootstrap.bundle';
import './assets/sb-admin-2.min.css';
import './assets/datatables/jquery.dataTables.min.js';
import './assets/datatables/dataTables.bootstrap4.min.css';
import fontawesome from '@fortawesome/fontawesome-free/css/all.css'
import './assets/custom.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueAuth from '@websanova/vue-auth'
import BootBox from 'bootbox'
import BootstrapVue from 'bootstrap-vue'

import VueHighlightJS from 'vue-highlightjs'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/heighlight.min.css'
import VueStripeCheckout from 'vue-stripe-checkout';
Vue.config.productionTip = false;
import moment from "moment";
window.bootbox = BootBox;
import _ from 'lodash';
import store from './store/store' 
import filters from './utils/filter'

Vue.use(VueHighlightJS);
Vue.use(fontawesome);
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios);
Vue.router = router;

let configs = {
    dev: {
        apiUrl: "",
        stripePk: '',
    },
  uat:{
    apiUrl: "",
    stripePk: '',
  },
  prod: {
    apiUrl: '',
    stripePk: '',
  }
}
configs.development = configs.dev
configs.production = configs.prod
configs.test = configs.uat

let env = process.env.ENV || process.env.NODE_ENV || 'dev'
if (location.host.startsWith("dash-uat")){
  env = 'uat'
}
let config = configs[env]
console.log(config)
Vue.use(VueStripeCheckout, config.stripePk);

Vue.axios.defaults.baseURL = config.apiUrl
Vue.prototype._translationCache = {} // TODO minor cache in memory instead of hit localStory everytime

import interceptorsSetup from './services/interceptors'
// and running it somewhere here
interceptorsSetup();



Vue.mixin({
    methods: {
        txt: function (translationKey) {

            let translate = JSON.parse(localStorage.getItem('translation')) || {}
            let lang = localStorage.getItem('activeLang') || 'en_US';
            return _.get(translate, `translations.${translationKey}.${lang}`, '_' + translationKey)
        },
        languages: function () {
            let language = JSON.parse(localStorage.getItem('translationLanguage')) || []
            return language;
        },
        convertDate: function (str) {
            var d = new Date(str),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;
            return [year, month, day].join("-");
        }
    },
})

new Vue({
    router,
    store,
    filters,
    created: function () {
        // `this` points to the vm instance
        console.log('created')
    },
    render: h => {
        return h(App);
    }
}).$mount('#app');

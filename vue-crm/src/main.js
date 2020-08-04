import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
import messagePlugin from "./utils/message.plugin";
import titlePlugin from "./utils/title.plugin";
import router from "./router";
import store from "./store";
import Loader from "./components/app/Loader";
import dateFilter from "./filters/date.filter";
import localizeFilter from "./filters/localize.filter";
import VueMeta from "vue-meta";
import tooltipDirective from "./directives/tooltip.directive";
import Paginate from "vuejs-paginate";

import "materialize-css/dist/js/materialize.min";
import "./registerServiceWorker";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import currencyFilter from "./filters/currency.filter";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(VueMeta);
Vue.component("Loader", Loader);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.filter("localize", localizeFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Paginate", Paginate);

const firebaseConfig = {
  apiKey: "AIzaSyDbU3pxAHvX1UpvsclmVWmb8AezAYcNSRo",
  authDomain: "vue-crm-ed038.firebaseapp.com",
  databaseURL: "https://vue-crm-ed038.firebaseio.com",
  projectId: "vue-crm-ed038",
  storageBucket: "vue-crm-ed038.appspot.com",
  messagingSenderId: "252715827830",
  appId: "1:252715827830:web:f4ec65b9a8922e5e271557",
};

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});

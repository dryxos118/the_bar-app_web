import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";

import "bootstrap/dist/css/bootstrap.min.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "./styles/main.css";

import App from "./App.vue";
import router from "./router";
import { barDark, barLight } from "./plugins/theme";
import "@/plugins/http";
import { fr } from "vuetify/locale";
import { md3 } from "vuetify/blueprints";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(
  createVuetify({
    theme: {
      defaultTheme: "barDark",
      themes: {
        barDark,
        barLight,
      },
    },
    locale: {
      locale: "fr",
      messages: { fr },
    },
    blueprint: md3,
  })
);
app.mount("#app");

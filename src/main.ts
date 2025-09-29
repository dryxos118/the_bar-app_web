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
  })
);
app.mount("#app");

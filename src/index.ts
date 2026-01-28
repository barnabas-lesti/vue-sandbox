import { createApp } from "vue";

import App from "./app/App.vue";
import { appRouter } from "./app/appRouter";

import "./index.css";

const app = createApp(App);

app.use(appRouter);

app.mount("#app");

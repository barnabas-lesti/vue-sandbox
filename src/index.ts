import { createApp } from "vue";

import App from "./app/App.vue";

import "./index.css";
import { appRouter } from "./app/appRouter";

const app = createApp(App);

app.use(appRouter);

app.mount("#app");

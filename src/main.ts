import { createApp } from "vue";
import "./styles/index.css";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { store } from "./store";
import { decodeToken } from "./utils/decodeToken";

const accessToken = localStorage.getItem("accessToken");
if(accessToken) {
    const user = decodeToken(accessToken);
    store.dispatch("asyncToken", accessToken);
    store.dispatch("getUserByToken", user);
}

library.add(fas, far);

createApp(App).component("vue-icon", FontAwesomeIcon).use(store).use(router).mount("#app");

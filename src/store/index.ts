import { createStore } from "vuex";
import { auth } from "./modules/auth";
import { post } from "./modules/post";
import { comment } from "./modules/comment";
import { user } from "./modules/user";

export const store = createStore({
  modules: {
    auth,
    user,
    post,
    comment
  }
});

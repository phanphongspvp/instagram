import { StatePost } from "@/types/post";
import { MutationTree } from "vuex";

export const mutations: MutationTree<StatePost> = {
    SET_LOADING(state: StatePost, loading: boolean) {
        state.loading = loading;
    },
    SET_ERROR(state: StatePost, error: string) {
        state.error = error;
    },
    SET_POSTS(state: StatePost, posts: string[]) {
        state.posts = posts;
    },
    SET_POST(state: StatePost, post) {
        state.post = post;
    }
}
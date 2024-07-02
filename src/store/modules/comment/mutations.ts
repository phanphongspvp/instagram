import { StateComment } from "@/types/comment";
import { MutationTree } from "vuex";

export const mutations: MutationTree<StateComment> = {
    SET_LOADING(state: StateComment, loading: boolean) {
        state.loading = loading;
    },
    SET_ERROR(state: StateComment, error: string) {
        state.error = error;
    },
    SET_COMMENTS(state: StateComment, comments: string[]) {
        state.comments = comments;
    },
    CREATE_COMMENT(state: StateComment, comment) {
        state.comments.push(comment);
    }
}
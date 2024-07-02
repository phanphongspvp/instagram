import { StateUser, User } from "@/types/user";
import { MutationTree } from "vuex";

export const mutations: MutationTree<StateUser> = {
    SET_LOADING(state: StateUser, loading: boolean) {
        state.loading = loading;
    },
    SET_ERROR(state: StateUser, error: string) {
        state.error = error;
    },
    SET_USER(state: StateUser, user: User) {
        state.user = user;
    }
}
import { ActionTree, Commit } from "vuex";
import { StateUser } from "@/types/user";
import axiosInstance from "@/utils/axiosInstance";

export const actions: ActionTree<StateUser, any> = {
    async getUserById({ commit }: { commit: Commit }, id: string) {
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.get("users/" + id);
            commit("SET_USER", res.data);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async getUserByToken({ commit }, user) {
        commit("SET_USER", user);
    }
}
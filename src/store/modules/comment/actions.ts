import { ActionTree, Commit } from "vuex";
import { StateComment } from "@/types/comment";
import axiosInstance from "@/utils/axiosInstance";

export const actions: ActionTree<StateComment, any> = {
    async getComments({ commit }: { commit: Commit }, postId: string) {
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.get("comments/" + postId);
            commit("SET_COMMENTS", res.data);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async createComment({ commit }: { commit: Commit }, data) {
        const { postId, userId, comment } = data;
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.post(`comments/${postId}/${userId}`, { comment: comment});
            commit("CREATE_COMMENT", res.data);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    }
}
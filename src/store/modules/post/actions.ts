import { StatePost } from "@/types/post";
import axiosInstance from "@/utils/axiosInstance.ts"
import { ActionTree, Commit } from "vuex";

export const actions: ActionTree<StatePost, any> = {
    async getPostsByUserId({ commit }: { commit: Commit }, userId: string) {
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.get("posts/users/" + userId);
            commit("SET_POSTS", res.data);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async getPostById({ commit }: { commit: Commit }, id: string) {
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.get("posts/" + id);
            commit("SET_POST", res.data);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async createPost({ commit }: { commit: Commit }, posts) {
        commit("SET_LOADING", true);
        try {
            await axiosInstance.post(`posts/${posts?.userId}`, {
                content: posts.content,
                imageUrls: posts.images
            });
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async deletePost({ commit, state }: { commit: Commit, state: StatePost }, id) {
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.delete(`posts/${id}`);
            const posts = state.posts.filter(post => post._id != res.data._id);
            commit("SET_POSTS", posts);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async likePost({ commit }: { commit: Commit }, data) {
        const { userId, postId } = data;
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.post(`posts/likePost/users/${userId}/posts/${postId}`);
            commit("SET_POST", res.data);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    },
    async unLikePost({ commit }: { commit: Commit }, data) {
        const { postId, userId } = data;
        commit("SET_LOADING", true);
        try {
            const res = await axiosInstance.post(`posts/unLikePost/users/${userId}/posts/${postId}`);
            commit("SET_POST", res.data);
        } catch (error) {
            commit("SET_ERROR", error);
        } finally {
            commit("SET_LOADING", false);
        }
    }
}
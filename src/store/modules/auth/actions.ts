import { ActionTree } from "vuex";
import { StateAuth } from "@/types/auth";
import axiosInstance from "@/utils/axiosInstance";

export const actions: ActionTree<StateAuth, any> = {
  async login({ commit }, data) {
    try {
      const res = await axiosInstance.post("auth/login", data);
      const accessToken = res.data?.accessToken;
      commit("setAccessToken", accessToken);
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error(error);
    }
  },
  async signup({ commit }, data) {
    try {
      const res = await axiosInstance.post("auth/signup", data);
      const accessToken = res.data?.accessToken;
      commit("setAccessToken", accessToken);
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.error(error);
    }
  },
  async logout({ commit }) {
    commit("clearAccessToken");
  },
  async asyncToken({ commit }, token) {
    commit("setAccessToken", token);
  }
};

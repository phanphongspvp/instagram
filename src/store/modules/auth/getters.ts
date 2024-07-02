import { GetterTree } from "vuex";
import { StateAuth } from "@/types/auth";

export const getters: GetterTree<StateAuth, any> = {
    isAuthenticated: (state) => {
        return !!state.accessToken;
    }
};

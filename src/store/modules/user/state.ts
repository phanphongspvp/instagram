import { StateUser } from "@/types/user";

const defineUser = {
    userId: "",
    name: "",
    username: "",
    roles: "",
    avatar: ""
}

export const initState = (): StateUser => {
    return {
        user: defineUser,
        loading: false,
        error: null
    }
}
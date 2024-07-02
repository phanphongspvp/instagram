import { StateComment } from "@/types/comment";

export const initState = (): StateComment => {
    return {
        comments: [],
        loading: false,
        error: null
    }
}
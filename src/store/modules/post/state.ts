import { StatePost, Post } from "@/types/post";

const definePost: Post = {
    content: "",
    imageUrls: [],
    audio: "",
    like: [],
}

export const initState = (): StatePost => {
    return {
        posts: [],
        post: definePost,
        loading: false,
        error: null
    }
}
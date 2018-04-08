import axios from "axios";


export function loadPosts(page=1) {
    return axios.get(`/posts?page=${page}`);
}

export function loadPost(id) {
    return axios.get(`/posts/${id}`);
}

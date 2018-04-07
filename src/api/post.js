import axios from "axios";


export async function loadPosts(page=1) {
    return await axios.get(`/posts?page=${page}`);
}

export async function loadPost(id) {
    return await axios.get(`/posts/${id}`);
}

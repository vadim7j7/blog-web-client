import { observable, action } from "mobx";

import { loadPosts } from "../api/post";
import PostModel from "../model/post";


export default class PostListStory {
    @observable loading = false;
    @observable posts = [];
    @observable pagination = {};

    @action async fetch(page=1) {
        this.loading = true;

        const resp = await loadPosts(page).catch(_ => {});
        this.fetchData(resp);

        this.loading = false;
    }

    @action clear() {
        this.posts.clear();
    }

    @action fetchData(resp) {
        if (!resp) { return; }

        this.pagination = resp.data.meta.pagination;

        resp.data.posts.forEach((post) => {
            this.posts.push(new PostModel(post));
        });
    }
}

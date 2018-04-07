import { observable, action, computed } from "mobx";

import { loadPosts } from "../api/post";
import PostModel from "../model/post";


export default class PostListStory {
    @observable loading = false;
    @observable posts = [];
    @observable pagination = observable.map();

    @computed get paginationIsValid() {
        return this.pagination.size === 4;
    }

    @action async fetch(page=1) {
        this.loading = true;

        const resp = await loadPosts(page).catch(_ => {});
        this.fetchData(resp);

        this.loading = false;
    }

    @action fetchData(resp) {
        if (!resp) { return; }

        this.pagination.merge(resp.data.meta.pagination);

        this.posts.clear();

        resp.data.posts.forEach((post) => {
            this.posts.push(new PostModel(post));
        });
    }
}

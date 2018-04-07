import { observable, action } from "mobx";

import { loadPost } from "../api/post";
import PostModel from "../model/post";


export default class PostItemStory {
    @observable loading = false;
    @observable post = null;

    @action async fetch(slug) {
        this.loading = true;

        const resp = await loadPost(slug).catch(_ => {});
        this.fetchData(resp);

        this.loading = false;
    }

    @action fetchData(resp) {
        if (!resp) { return; }

        this.post = new PostModel(resp.data.post);
    }
}

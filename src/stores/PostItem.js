import { observable, action } from "mobx";

import { loadPost } from "../api/post";
import PostModel from "../model/post";


export default class PostItemStory {
    @observable loading = false;
    @observable post = null;

    @action fetch(slug) {
        this.loading = true;

        loadPost(slug)
            .then((resp) => {
                this.fetchData(resp);
            })
            .finally(() => {
                this.loading = false;
            })
        ;
    }

    @action fetchData(resp) {
        this.post = new PostModel(resp.data.post);
    }
}

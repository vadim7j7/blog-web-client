import { observable, computed } from "mobx";


export default class PostModel {
    @observable post = observable.map();

    constructor(data={}) {
        this.post.merge(data);
    }

    @computed get id() {
        return this.post.get("id");
    }

    @computed get title() {
        return this.post.get("title");
    }

    @computed get slug() {
        return this.post.get("slug");
    }

    @computed get body() {
        return this.post.get("body");
    }
}

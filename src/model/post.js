import { observable, computed } from "mobx";

import UserModel from "./user";


export default class PostModel {
    @observable post = observable.map();
    @observable user;

    constructor(data={}) {
        this.post.merge(data);

        this.user = new UserModel(data.user)
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

    @computed get tags() {
        return this.post.get("tagList");
    }

    @computed get userModel() {
        return this.user;
    }
}

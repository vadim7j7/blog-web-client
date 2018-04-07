import { observable, computed } from "mobx";


export default class UserModel {
    @observable user = observable.map();

    constructor(data={}) {
        this.user.merge(data);
    }

    @computed get title() {
        return this.user.get("title");
    }

    @computed get description() {
        return this.user.get("description");
    }

    @computed get avatar() {
        return this.user.get("avatar");
    }

    @computed get firstName() {
        return this.user.get("firstName");
    }

    @computed get lastName() {
        return this.user.get("lastName");
    }

    @computed get fullName() {
        return this.user.get("fullName");
    }

    @computed get smallName() {
        return this.user.get("smallName");
    }
}

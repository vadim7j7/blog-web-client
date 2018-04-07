import { observable, action } from "mobx";
import { Toaster, Intent } from "@blueprintjs/core";

import UserModel from "../model/user";
import { checkLogin, login } from "../api/user";
import { settingToken } from "../config/api";


export default class CurrentUser {
    @observable loading = false;
    @observable user    = null;
    @observable error   = null;

    @action async checkLogin() {
        const resp = await checkLogin().catch(() => { this.user = null; });
        if (!resp) {
            this.user = null;
            return;
        }

        this.user = new UserModel(resp.data.profile);
    }

    @action signIn(email, password, callback) {
        this.loading = true;

        login(email, password)
            .then((resp) => {
                this.loading = false;

                Toaster.create(resp.data.message).show({
                    message: resp.data.message,
                    icon: "tick",
                    intent: Intent.SUCCESS
                });

                settingToken(resp.data.access_token);
                this.checkLogin();
                callback();
            })
            .catch((error) => {
                this.loading = false;
                if (error.response &&
                    error.response.data &&
                    error.response.data.error &&
                    error.response.data.error.user_authentication
                ) {
                    this.error = error.response.data.error.user_authentication;
                } else {
                    this.error = "Unknown error.";
                }
            })
        ;
    }
}

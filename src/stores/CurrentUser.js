import { observable, action } from "mobx";
import { Toaster, Intent } from "@blueprintjs/core";

import UserModel from "../model/user";
import { checkLogin, login, registration } from "../api/user";
import { settingToken } from "../config/api";


export default class CurrentUser {
    @observable loading = false;
    @observable user    = null;
    @observable error   = null;

    @action checkLogin() {
        checkLogin()
            .then((resp) => {
                this.user = new UserModel(resp.data.profile);
            })
            .catch(() => {
                this.user = null;
            })
        ;
    }

    @action.bound signOut() {
        this.user = null;
        localStorage.removeItem("token");
    }

    @action signIn(email, password, callback) {
        this.loading = true;

        login(email, password)
            .then((resp) => {
                this.success(resp);
                callback();
            })
            .catch((error) => {
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
            .finally(() => {
                this.loading = false;
            })
        ;
    }

    @action registration(email, password, firstName, lastName, title, description, callback) {
        this.loading = true;

        registration(email, password, firstName, lastName, title, description)
            .then((resp) => {
                this.success(resp);
                callback();
            })
            .catch((error) => {
                this.error = error.response.data;
            })
            .finally(() => {
                this.loading = false;
            })
        ;
    }

    @action success(resp) {
        Toaster.create(resp.data.message).show({
            message: resp.data.message,
            icon: "tick",
            intent: Intent.SUCCESS
        });

        settingToken(resp.data.accessToken);
        this.checkLogin();
    }
}

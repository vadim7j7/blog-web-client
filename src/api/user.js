import axios from "axios";


export function checkLogin() {
    return axios.get("/auth");
}

export function login(email, password) {
    return axios.post("/auth/login", {
        email: email,
        password: password
    });
}

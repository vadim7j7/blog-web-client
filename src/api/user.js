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

export function registration(email, password, firstName, lastName, title, description) {
    return axios.post("/auth/registration", {
        email: email,
        password: password,
        password_confirmation: password,
        profile_attributes: {
            first_name: firstName,
            last_name: lastName,
            title: title,
            description: description
        }
    });
}

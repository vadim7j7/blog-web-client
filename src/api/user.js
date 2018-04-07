import axios from "axios";


export async function checkLogin() {
    return await axios.get("/auth");
}

export function login(email, password) {
    return axios.post("/auth/login", {
        email: email,
        password: password
    });
}

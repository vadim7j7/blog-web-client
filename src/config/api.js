import axios from "axios";


export const BACK_END_HOST = "http://localhost:4000";
export const END_POINT = `${BACK_END_HOST}/version1`;

export function settingToken(t) {
    axios.defaults.headers.Authorization = `bearer ${t}`;
    localStorage.setItem("token", t);
}

export default function bootInit() {
    axios.defaults.baseURL = END_POINT;

    const token = localStorage.getItem("token");
    if (token) { settingToken(token); }
}

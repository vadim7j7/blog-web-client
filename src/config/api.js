import axios from "axios";

const END_POINT = "http://localhost:4000/version1";

export default function bootInit() {
    axios.defaults.baseURL = END_POINT;
}

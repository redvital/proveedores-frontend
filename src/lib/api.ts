import Axios from "axios";

let urls = {
    test: `http://127.0.0.1:8000/api`,
    development: 'http://127.0.0.1:8000/api',
    production: 'http://127.0.0.1:8000/api'
}
const api = Axios.create({
    // baseURL: urls[process.env.NODE_ENV],
    baseURL: urls.development,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Max-Age': 86400
    }
});

export default api;
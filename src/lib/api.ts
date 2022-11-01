import Axios from "axios";

const api = Axios.create({
	baseURL: process.env.API_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Max-Age": 86400,
	},
});

console.log(process.env.API_URL);
console.log(process.env.NODE_ENV);

export default api;

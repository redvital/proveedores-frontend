import Axios from "axios";


const api = Axios.create({
	baseURL: process.env.API_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"Access-Control-Max-Age": 86400,
	},
});

api.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
api.interceptors.response.use(
	function (response) {
		// Do something with response data
		return response;
	},
	function (error) {
		// Do something with response error

		console.error(error);
		return Promise.reject(error);
	}
);

console.log(process.env.API_URL);
console.log(process.env.NODE_ENV);

export default api;

import { IUser } from "../interfaces/user.interface"

export const setToken = (token: string) => {
	localStorage.setItem("token", token);
};

export const getToken = () => {
	const token = localStorage.getItem("token");
	return token ?? null;
};


export const removeToken = () => {
	localStorage.removeItem("token");
}

export const setUser = (user: any) => {
	localStorage.setItem("user", JSON.stringify(user));
}

export const getUser = () : IUser | null => {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(JSON.stringify(user)) : null;
}
import { IUser } from "../interfaces/user.interface";

export const setToken = (token: string) => {
	localStorage.setItem("token", token);
};

export const getToken = () => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token");
		return token ?? null;
	}
};

export const removeToken = () => {
	localStorage.removeItem("token");
};

export const setUserStorage = (user: any) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const getUserStorage = (): IUser | null => {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(JSON.stringify(user)) : null;
};

import api from "@/lib/api";

export const loginUser = async (body: { email: string; password: string }) => {
	return await api.post("/login", body);
};

export const registerUser = async (body: {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
}) => {
	try {
		return await api.post("/register", body);
	} catch (error) {
		console.error(error);
	}
};

export const logoutUser = async () => {
	try {
		return await api.post("/logout");
	} catch (error) {
		console.error(error);
	}
};

export const profileUser = async (accessToken: string) => {
	return await api.get("/me", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

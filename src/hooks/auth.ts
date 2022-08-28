import { useEffect, useState } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { useRouter } from "next/router";
import {
	getToken,
	removeToken,
	setToken,
} from "@/services/local-storage.service";

export const useAuth = ({ middleware } = {}) => {
	const router = useRouter();
	const [token, addToken] = useState(null);
	const [user, setUser] = useState(null);

	const { data, error, mutate } = useSWR("/api/user", () =>
		api
			.get("/auth/me", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			})
			.then((res) => {
				setUser(res.data);
				console.log(res.data);
			})
			.catch((error) => {
				console.error("Error authMe  :", error);

				if (error.response.status != 409) throw error;
				router.push("/verify-email");
			})
	);

	const login = async (setErrors: any, dataSend: any) => {
		setErrors([]);

		api.post("/login", dataSend)
			.then((resp) => {
				// mutate();
				addToken(resp.data.access_token);

				setToken(resp.data.access_token);
				console.log("login success", resp.data);

				router.push("/dashboard");
			})
			.catch((error) => {
				if (error.response.status != 422) throw error;

				setErrors(Object.values(error.response.data.errors).flat());
			});
	};

	const logout = async () => {
		api.post(
			"/auth/logout",
			{},
			{
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			}
		)
			.then(() => {
				mutate(null);
				setToken(null);
				setUser(null);
				removeToken();
				router.push("/login");
			})
			.catch((error) => {
				console.error("Error logout :", error);
				router.push("/login");
			});
	};

	useEffect(() => {
		if (user || error) {
			console.log("useEffect user", user, error);

			// setIsLoading(false);
		}
		if (middleware === "guest" && user) return;
		if (middleware === "auth" && error) router.push("/login");
	}, [user, error]);

	return {
		user,
		login,
		logout,
	};
};

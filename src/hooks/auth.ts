import { useEffect, useState } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { useRouter } from "next/router";
import {
	getToken,
	getUserStorage,
	removeToken,
	setToken,
	setUserStorage,
} from "@/services/local-storage.service";
import { IUser } from "@/interfaces/user.interface";

export const useAuth = ({ middleware } = {}) => {
	const router = useRouter();
	const [token, addToken] = useState(null);

	const [loading, setLoading] = useState<boolean>(true);

	const {
		data: user,
		error,
		mutate,
	} = useSWR<IUser>("api/auth/me", () =>
		api
			.get("/auth/me", {
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			})
			.then((res) => res.data)
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

				router.push("/admin/dashboard");
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
				// setUser(null);
				removeToken();
				router.push("/admin/login");
			})
			// .catch((error) => {
			// 	console.error("Error logout :", error);
			// 	router.push("/admin/login");
			// });
	};

	useEffect(() => {
		if (user || error) {
			console.log("useEffect user", user, error);

			setLoading(false);
		}
		if (middleware === "guest" && user) return;
		if (middleware === "auth" && error) router.push("/admin/login");
	}, [user, error]);

	return {
		user,
		login,
		logout,
		loading,
	};
};

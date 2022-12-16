import { useEffect, useState } from "react";
import useSWR from "swr";
import api from "@/lib/api";
import { useRouter } from "next/router";
import {
	getToken,
	getUserStorage,
	removeUser,
	removeToken,
	setToken,
	setUserStorage,
} from "@/services/local-storage.service";
import { IUser } from "@/interfaces/user.interface";
import { useToast } from "@chakra-ui/react";
import { HttpStatusCode } from "../common/enums/httpStatusCode";

export const useAuth = ({ middleware }) => {
	const router = useRouter();
	const [token, addToken] = useState<undefined | string>(undefined);

	const [loading, setLoading] = useState<boolean>(true);

	const accessToken = token ?? getToken();

	const toast = useToast();

	const {
		data: user,
		error,
		mutate,
	} = useSWR<IUser>("/auth/me", () => {
		if (!accessToken) return null;

		return api
			.get("/me", {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((res) => {
				setUserStorage(res.data);
				return res.data;
			})
			.catch((error) => {
				console.error("Error authMe  :", error);

				removeToken();

				if (error.response.status != 409) throw error;
				router.push("/verify-email");
			});
	});

	const login = async (setErrors: any, dataSend: any) => {
		setErrors([]);

		api.post("/login", dataSend)
			.then((resp) => {
				if (resp.status === HttpStatusCode.Ok) {
					toast({
						status: "success",
						description: "Identificación correcta, espere un momento...",
					});

					addToken(resp.data.access_token);

					setToken(resp.data.access_token);

					setTimeout(() => {
						router.push("/admin/dashboard");
						toast.closeAll();
					}, 3000);
				}
			})
			.then((resp) => mutate)
			.catch((error) => {
				if (error.response) {
					setErrors(error.response.data.error);
					console.log(error.response.data.error);
					console.log(error.response.status);

					toast({
						status: "error",
						description: error.response.data.error,
					});
				}
			});
	};

	const logout = async () => {
		// api.post(
		// 	"/logout",
		// 	{},
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${getToken()}`,
		// 		},
		// 	}
		// ).then(() => {
		// removeUser();
		// removeToken();
		localStorage.clear()
		mutate(null);
		router.push("/admin/login");
		// })
		// .catch((error) => {
		// 	console.error("Error logout :", error);
		// 	router.push("/admin/login");
		// });
	};

	useEffect(() => {
		if (user || error) {
			setLoading(false);
		}

		if (middleware === "guest" && user) return;
		if (middleware === "auth" && error) router.push("/admin/login");
	}, [user, error, token]);

	return {
		user,
		login,
		logout,
		loading,
		mutate,
	};
};

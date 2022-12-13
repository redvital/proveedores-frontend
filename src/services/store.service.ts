import { Dispatch, SetStateAction } from "react"; 

import api from "@/lib/api";
import { getToken } from "@/services/local-storage.service";
import { IStore } from "@/interfaces/store.interface";

const token = getToken();

export const getStores= async (
	set: Dispatch<SetStateAction<IStore[]>>
) => {
	const { data } = await api.get("store", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	set(data.data);
};
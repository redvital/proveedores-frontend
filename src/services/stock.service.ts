import { Dispatch, SetStateAction } from "react";
import { getToken } from "@/services/local-storage.service";
import { IStock } from "@/interfaces/stock.interface";

import api from "@/lib/api";

const token = getToken();

export const getStock = async ( 
	id : number,
	set: Dispatch<SetStateAction<IStock[]>>
) => {
	const { data } = await api.get(`store/${id}/stock`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	});
	set(data.data);
};
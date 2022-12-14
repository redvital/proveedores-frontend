import { Dispatch, SetStateAction } from "react";
import { getToken } from "@/services/local-storage.service";
import { IStock } from "@/interfaces/stock.interface";

import api from "@/lib/api";

const token = getToken();

export const getStock = async (
	set: Dispatch<SetStateAction<IStock[]>>
) => {
	const { data } = await api.get("store/stock", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
        params :{
            store: 1,
            supplier_id:2
        }
	});

	set(data.data);
};
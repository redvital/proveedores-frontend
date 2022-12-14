import { Dispatch, SetStateAction } from "react";

import api from "@/lib/api";
import { getToken } from "@/services/local-storage.service";
import { IProducts } from "@/interfaces/product.interface";
import { ICreateProduct } from "@/interfaces/create-product.interface"

const token = getToken();

export const getProducts = async (
	set: Dispatch<SetStateAction<IProducts[]>>
) => {
	const { data } = await api.get("supplier/1/products", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	set(data.data);
};

export const createProduct = async (product: ICreateProduct) => {
	const {
		name,
		category_id,
		sku,
		barcode,
		special_payment_method,
		condition,
		currency,
		packing_quantity,
		quantity_available,
		bulk_cost,
		unit_price,
	} = product;

	const response = await api.post(
		"supplier/1/products",
		{
			name: name,
			category: category_id,
			sku_provider: sku,
			bar_code: barcode,
			method_of_payment: special_payment_method,
			condition: condition,
			currency: currency,
			cost_per_unit: unit_price,
			cost_per_package: bulk_cost,
			sugessted_price: 5000,
			provider_id: 1,
			commercialized: 1,
			approved: 1,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	return response;
};

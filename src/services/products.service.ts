import { Dispatch, SetStateAction } from "react";

import api from "@/lib/api";
import { getToken } from "@/services/local-storage.service";
import { IProducts } from "@/interfaces/product.interface";
import { ICreateProduct } from "@/interfaces/create-product.interface"
import { IUser } from "@/interfaces/user.interface"

const token = getToken();

export const getProducts = async (
	set: Dispatch<SetStateAction<IProducts[]>>
) => {
	const { data } = await api.get("product/1", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	set(data.data);
};

export const createProduct = async (product: ICreateProduct, user: IUser) => {
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

	const providerId = user.provider_user_me.id

	const response = await api.post(
		`supplier/${providerId}/products`,
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
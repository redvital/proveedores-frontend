import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { getToken } from "@/services/local-storage.service";

import api from "@/lib/api";

const token = getToken();

const mapper = (data: any) => {
	return data.map((item: any) => {
		return {
			id: item.id,
			name: item.title,
		};
	});
};

export const getTypeProviders = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/providertype/ddlist", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.value,
				name: item.label,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getStatesOfVenezuela = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/state", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.state,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getPaymentOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/paymentmethod", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.payment_method,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getBankOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/bank", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.bank,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getCurrencyOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/coin", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.coin,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getPaymentMethodOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/paymentmethod", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.payment_method,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getAccountTypesOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get(
			"https://jsonplaceholder.typicode.com/todos"
		);

		const data = mapper(response.data);

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getCategoryOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get(
			"/category",{
				headers: {
					Authorization: `Bearer ${token}`,
				}
			}
		);

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.name,
			};
		});
		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getSpecialPaymentMethodsOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/specialformofpayment", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.form_of_payment,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};
export const getConditionsOptions = async (
	set: Dispatch<SetStateAction<never[]>>
) => {
	try {
		const response = await api.get("/condition", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = response.data.data.map((item: any) => {
			return {
				id: item.id,
				name: item.condition,
			};
		});

		set(data);
	} catch (error) {
		console.error(error);
	}
};

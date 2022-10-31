import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const api = axios;

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
		const response = await api.get(
			"https://jsonplaceholder.typicode.com/todos"
		);

		const data = mapper(response.data);

		set(data);
	} catch (error) {
		console.error(error);
	}
};

export const getStatesOfVenezuela = async (
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

export const getPaymentOptions = async (
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

export const getBankOptions = async (
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

export const getCurrencyOptions = async (
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

export const getPaymentMethodOptions = async (
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

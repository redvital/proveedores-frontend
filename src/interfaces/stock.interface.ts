export interface IStock {
	id: number;
	quantity: number;
	product_id: number;
	store_id: number;
	supplier_id: number;
	created_at: Date;
	updated_at: Date;
	products: any[];
}

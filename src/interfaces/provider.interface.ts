export interface IProviders {
	id: number;
	name: string;
	email: string;
	phone_number: string;
	company: string;
	rif: string;
	provider_type: string;
	created_at: Date;
	updated_at: Date;
	bank_details: any[];
	supplier_information: any[];
}

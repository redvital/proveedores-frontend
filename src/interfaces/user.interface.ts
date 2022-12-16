export interface IUser {
	id: number;
	name: string;
	email: string;
	email_verified_at?: any;
	two_factor_confirmed_at?: any;
	current_team_id?: any;
	profile_photo_path?: any;
	role: string;
	created_at: Date;
	updated_at: Date;
	profile_photo_url: string;
	provider_user_me: ProviderUser;
}

export interface ProviderUser {
	id: number;
	name: string;
	email: string;
	phone_number: string;
	company: string;
	rif: string;
	provider_type: string;
	user_id: number;
	created_at: Date;
	updated_at: Date;
}

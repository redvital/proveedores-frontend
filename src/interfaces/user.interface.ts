export interface IUser {
	id: number;
	name: string;
	email: string;
	email_verified_at?: any;
	two_factor_confirmed_at?: any;
	current_team_id?: any;
	profile_photo_path?: any;
	created_at: Date;
	updated_at: Date;
	profile_photo_url: string;
}

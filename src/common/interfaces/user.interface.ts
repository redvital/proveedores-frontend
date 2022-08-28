export interface IUser {
    id:                      number;
    name:                    string;
    email:                   string;
    email_verified_at:       null;
    two_factor_confirmed_at: null;
    current_team_id:         null;
    profile_photo_path:      null;
    created_at:              Date;
    updated_at:              Date;
    profile_photo_url:       string;
}
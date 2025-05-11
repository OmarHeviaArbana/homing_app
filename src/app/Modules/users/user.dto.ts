export interface UserDTO {
  name: string;
  username: string;
  email: string;
  role_id: string;
  password?: string;
  password_confirmation?: string;
}

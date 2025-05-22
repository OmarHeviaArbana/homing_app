export class UserDTO {
  name: string;
  username: string;
  email: string;
  role_id: string;
  password: string;

  constructor(
    name: string,
    username: string,
    email: string,
    password: string,
    role_id: string,
  ) {
    this.name = name;
    this.username = username;
    this.role_id = role_id;
    this.email = email;
    this.password = password;
  }
}

import { UserDTO } from '../../Users/models/user.dto';

export class AuthDTO {
  user: UserDTO;
  access_token: string;
  email: string;
  password: string;

  constructor(
    user: UserDTO,
    access_token: string,
    email: string,
    password: string,
  ) {
    this.user = user;
    this.access_token = access_token;
    this.email = email;
    this.password = password;
  }
}

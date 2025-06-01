import { BreederDTO } from "../../Breeders/models/breeder.dto";
import { ShelterDTO } from "../../Shelters/models/shelter.dto";

export class UserDTO {
  id: number;
  name: string;
  username: string;
  email: string;
  role_id: number;
  password: string;
  user: UserDTO | null = null;
  shelter: ShelterDTO | null = null
  breeder: BreederDTO | null = null
  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    password: string,
    role_id: number,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.role_id = role_id;
    this.email = email;
    this.password = password;
  }
}

export class BreederDTO {
  id?: number
  user_id?: number;
  name?: string;
  logo_url?: string;
  address?: string;
  location?: string;
  description?: string;
  phone?: string;
  email_breeder?: string;
  certification?: string;
  files?: { [key: string]: File | null };

  constructor(
    user_id: number,
    name: string,
    logo_url: string,
    address: string,
    location: string,
    description: string,
    phone: string,
    email_breeder: string,
    certification: string,
    id?: number

  ) {
    this.id = id;
    this.user_id = user_id;
    this.name = name;
    this.logo_url = logo_url;
    this.address = address;
    this.location = location;
    this.description = description;
    this.phone = phone;
    this.email_breeder = email_breeder;
    this.certification = certification;
  }
}

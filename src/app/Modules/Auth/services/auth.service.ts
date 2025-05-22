import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AuthDTO } from '../models/auth.dto';
import { environment } from '../../../../environments/environment';
import { UserDTO } from '../../Users/models/user.dto';
import { LoginDTO } from '../models/login.dto';

export interface AuthToken {
  user: UserDTO;
  token: string;
  access_token: string;
  role_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'auth';
  }

  login(auth: LoginDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.API_URL}/auth/login`, auth)
      .pipe(catchError(this.sharedService.handleError));
  }
}

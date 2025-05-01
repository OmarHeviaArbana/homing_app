import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { AuthDTO } from '../models/auth.dto';
import { environment } from '../../../../environments/environment';

export interface AuthToken {
  user: any;
  token: string;
  user_id: string;
  access_token: string;
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

  login(auth: AuthDTO): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.API_URL}/auth/login`, auth)
      .pipe(catchError(this.sharedService.handleError));
  }
}

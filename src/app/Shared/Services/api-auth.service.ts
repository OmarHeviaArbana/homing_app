import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {
  private readonly API_URL = environment.apiUrl
  constructor(private http: HttpClient) {}

  apiLogin() {
    return this.http.post<{ access_token: string }>(`${this.API_URL}/auth/api-login`, {}).pipe(
      tap(response => {
        localStorage.setItem('api_token', response.access_token);
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { UserDTO } from '../models/user.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
   private readonly API_URL = environment.apiUrl

   constructor(private http: HttpClient, private sharedService: SharedService ) {}

  register(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>(`${this.API_URL}/auth/register`, user)
      .pipe(catchError(this.sharedService.handleError));
  }
}

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

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/users/delete/${id}`);
  }

  updateUser(userId: number, user: UserDTO): Observable<UserDTO> {
  return this.http
    .put<UserDTO>(`${this.API_URL}/users/update/${userId}`, user)
    .pipe(catchError(this.sharedService.handleError));
}

  getUserById(userId: number): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(`${this.API_URL}/users/getUser/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}

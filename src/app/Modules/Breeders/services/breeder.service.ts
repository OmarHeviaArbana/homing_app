import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { BreederDTO } from '../models/breeder.dto';
import { environment } from 'src/environments/environment';
import { AnimalDTO } from '../../Animals/models/animal.dto';

@Injectable({
  providedIn: 'root',
})
export class BreederService {
   private readonly API_URL = environment.apiUrl

   constructor(private http: HttpClient, private sharedService: SharedService ) {}

  createBreeder(breeder: BreederDTO): Observable<BreederDTO> {
    return this.http
      .post<BreederDTO>(`${this.API_URL}/breeders/create`, breeder)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllBreeders(): Observable<BreederDTO[]> {
    return this.http
    .get<BreederDTO[]>(`${this.API_URL}/breeders/getAll`)
    .pipe(catchError(this.sharedService.handleError));
    ;
  }

  getAnimalsBreeder(breederId: string): Observable<AnimalDTO[]> {
    return this.http
    .get<AnimalDTO[]>(`${this.API_URL}/breeders/${breederId}/animals`)
    .pipe(catchError(this.sharedService.handleError));
    ;
  }

  getBreederById(breederId: number): Observable<BreederDTO[]> {
    return this.http.get<BreederDTO[]>(`${this.API_URL}/breeders/getBreeder/${breederId}`);
  }

    updateBreeder(breederId: number, breeder: BreederDTO): Observable<BreederDTO> {
    return this.http
      .put<BreederDTO>(`${this.API_URL}/breeders/update/${breederId}`, breeder)
      .pipe(catchError(this.sharedService.handleError));
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { ShelterDTO } from '../models/shelter.dto';
import { environment } from 'src/environments/environment';
import { AnimalDTO } from '../../Animals/models/animal.dto';

@Injectable({
  providedIn: 'root',
})
export class ShelterService {
  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient, private sharedService: SharedService ) {}

  getAllShelters(): Observable<ShelterDTO[]> {
    return this.http
    .get<ShelterDTO[]>(`${this.API_URL}/shelters/getAll`)
    .pipe(catchError(this.sharedService.handleError));
    ;
  }

  createShelter(shelter: ShelterDTO): Observable<ShelterDTO> {
    return this.http
      .post<ShelterDTO>(`${this.API_URL}/shelters/create`, shelter)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAnimalsShelter(breederId: string): Observable<AnimalDTO[]> {
    return this.http
    .get<AnimalDTO[]>(`${this.API_URL}/shelters/${breederId}/animals`)
    .pipe(catchError(this.sharedService.handleError));
    ;
  }

  getShelterById(breederId: number): Observable<ShelterDTO[]> {
    return this.http.get<ShelterDTO[]>(`${this.API_URL}/shelters/getShelter/${breederId}`);
  }

  updateShelter(shelterId: number, shelter: ShelterDTO): Observable<ShelterDTO> {
  return this.http
    .put<ShelterDTO>(`${this.API_URL}/shelters/update/${shelterId}`, shelter)
    .pipe(catchError(this.sharedService.handleError));
  }
}

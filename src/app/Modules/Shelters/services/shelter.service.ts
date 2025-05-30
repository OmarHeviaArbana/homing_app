import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { ShelterDTO } from '../models/shelter.dto';
import { environment } from 'src/environments/environment';

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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalDTO } from '../models/animal.dto';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
   private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient, private sharedService: SharedService ) {}

  /**
   * Obtener todos los animales
   */
  getAll(): Observable<AnimalDTO[]> {
    return this.http
    .get<AnimalDTO[]>(`${this.API_URL}/animals/getAll`)
    .pipe(catchError(this.sharedService.handleError));
    ;
  }


}

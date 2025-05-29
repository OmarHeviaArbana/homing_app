import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalDTO } from '../models/animal.dto';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { AuxiliarEntityDTO } from 'src/app/Shared/Models/auxiliar-entity.dto';
import { addAnimalPhotos } from '../actions/animal.action';
import { AnimalPhotoDTO } from '../models/animal-photo.dto';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient, private sharedService: SharedService ) {}

  getAllAnimals(): Observable<AnimalDTO[]> {
    return this.http
    .get<AnimalDTO[]>(`${this.API_URL}/animals/getAll`)
    .pipe(catchError(this.sharedService.handleError));
    ;
  }

  createAnimal(animal: AnimalDTO): Observable<AnimalDTO> {
      return this.http
        .post<{message: string; animal: AnimalDTO}>(`${this.API_URL}/animals/create`, animal)
        .pipe(
            map(response => response.animal),
            catchError(this.sharedService.handleError));
  }

  addAnimalPhotos(data: { animal_id: number;photos: { image_url: string; principal: boolean }[];
    }): Observable<{ images: AnimalPhotoDTO[] }> {
      return this.http.post<{ images: AnimalPhotoDTO[] }>(`${this.API_URL}/animal-images/add`,data);
    }

  deleteAnimal(id: number): Observable<any> {
    console.log(id);

    return this.http.delete(`${this.API_URL}/animals/delete/${id}`);
  }

  getSpeciesAux(): Observable<AuxiliarEntityDTO[]> {
    return this.http
      .get<AuxiliarEntityDTO[]>(`${this.API_URL}/species`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getStatusAux(): Observable<AuxiliarEntityDTO[]> {
    return this.http
      .get<AuxiliarEntityDTO[]>(`${this.API_URL}/status`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAgeCategoriesAux(): Observable<AuxiliarEntityDTO[]> {
    return this.http
      .get<AuxiliarEntityDTO[]>(`${this.API_URL}/agecategories`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getGenresAux(): Observable<AuxiliarEntityDTO[]> {
    return this.http
      .get<AuxiliarEntityDTO[]>(`${this.API_URL}/genres`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getSizesAux(): Observable<AuxiliarEntityDTO[]> {
    return this.http
      .get<AuxiliarEntityDTO[]>(`${this.API_URL}/sizes`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getEnergyLevelsAux(): Observable<AuxiliarEntityDTO[]> {
    return this.http
      .get<AuxiliarEntityDTO[]>(`${this.API_URL}/energy-levels`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getHousingStagesAux(): Observable<AuxiliarEntityDTO[]> {
    return this.http
      .get<AuxiliarEntityDTO[]>(`${this.API_URL}/housing-stages`)
      .pipe(catchError(this.sharedService.handleError));
  }


}

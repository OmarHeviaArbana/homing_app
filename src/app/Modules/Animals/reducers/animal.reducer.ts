import { createReducer, on } from '@ngrx/store';
import * as AnimalActions from '../actions/animal.action'
import { AnimalDTO } from '../models/animal.dto';
import { AuxiliarEntityDTO } from 'src/app/Shared/Models/auxiliar-entity.dto';
import { AnimalPhotoDTO } from '../models/animal-photo.dto';
import { AnimalApplicationDTO } from '../models/animal-application';

export interface AnimalState {
  animals: AnimalDTO[];
  animalDetail: AnimalDTO[];
  application: AnimalApplicationDTO | null;
  species: AuxiliarEntityDTO[],
  status: AuxiliarEntityDTO[];
  ageCategories: AuxiliarEntityDTO[];
  genres: AuxiliarEntityDTO[];
  sizes: AuxiliarEntityDTO[];
  energyLevels: AuxiliarEntityDTO[];
  housingStages: AuxiliarEntityDTO[];
  photos: AnimalPhotoDTO[];
  animalFormData: Partial<AnimalDTO> | null;
  files: any;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AnimalState = {
  animals: [],
  animalDetail: [],
  application: null,
  species:[],
  status: [],
  ageCategories: [],
  genres: [],
  sizes: [],
  energyLevels: [],
  housingStages: [],
  photos: [],
  files: [],
  animalFormData: null,
  loading: false,
  loaded: false,
  error: null,
};

export const animalReducer = createReducer(
  initialState,
  on(AnimalActions.getAllAnimals, state => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(AnimalActions.getAllAnimalsSuccess, (state, { animals }) => ({
    ...state,
    animals,
    loading: false,
    loaded: true,
    error: null,
  })),

  on(AnimalActions.getAllAnimalsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  on(AnimalActions.getAnimalById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AnimalActions.getAnimalByIdSuccess, (state,  {animalDetail} ) => ({
    ...state,
    animalDetail,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AnimalActions.getAnimalByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(AnimalActions.createAnimal, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AnimalActions.createAnimalSuccess, (state, { animal }) => ({
    ...state,
    animal,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AnimalActions.createAnimalFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(AnimalActions.saveAnimalFormData, (state, { animalFormData }) => ({
    ...state,
    animalFormData,
  })),
  on(AnimalActions.clearAnimalFormData, state => ({
    ...state,
    animalFormData: null,
  })),

   on(AnimalActions.updateAnimal, (state) => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })),

    on(AnimalActions.updateAnimalSuccess, (state, animal) => ({
      ...state,
      animal: animal,
      loading: false,
      loaded: true,
      error: null,
    })),

    on(AnimalActions.updateAnimalFailure, (state, { payload }) => ({
      ...state,
      loading: false,
      loaded: false,
      error: { payload },
    })),



  on(AnimalActions.addAnimalPhotos, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AnimalActions.addAnimalPhotosSuccess, (state, { photo }) => ({
    ...state,
    photo,
    loading: false,
    loaded: true,
    error: null,
  })),
 on(AnimalActions.addAnimalPhotosFailure, (state, { error}) => ({
     ...state,
     loading: false,
     loaded: false,
     error: error,
  })),

  on(AnimalActions.setFilesFormData, (state, {  files }) => ({
    ...state,
    files
  })),

  on(AnimalActions.deleteAnimal, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AnimalActions.deleteAnimalSuccess, (state) => ({
    ...state,
    animal: null,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AnimalActions.deleteAnimalFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

  on(AnimalActions.getSpeciesAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getSpeciesAuxSuccess, (state, { species }) => ({
    ...state,
    species,
    loading: false,
  })),

  on(AnimalActions.getSpeciesAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(AnimalActions.getStatusAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getStatusAuxSuccess, (state, { status }) => ({
    ...state,
    status,
    loading: false,
  })),

  on(AnimalActions.getStatusAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  on(AnimalActions.getStatusAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getStatusAuxSuccess, (state, { status }) => ({
    ...state,
    status,
    loading: false,
  })),

  on(AnimalActions.getStatusAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  on(AnimalActions.getAgeCategoriesAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getAgeCategoriesAuxSuccess, (state, { ageCategories }) => ({
    ...state,
    ageCategories,
    loading: false,
  })),

  on(AnimalActions.getAgeCategoriesAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  on(AnimalActions.getGenresAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getGenresAuxSuccess, (state, { genres }) => ({
    ...state,
    genres,
    loading: false,
  })),

  on(AnimalActions.getGenresAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  on(AnimalActions.getSizesAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getSizesAuxSuccess, (state, { sizes }) => ({
    ...state,
    sizes,
    loading: false,
  })),

  on(AnimalActions.getSizesAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  on(AnimalActions.getEnergyLevelsAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getEnergyLevelsAuxSuccess, (state, { energyLevels }) => ({
    ...state,
    energyLevels,
    loading: false,
  })),

  on(AnimalActions.getEnergyLevelsAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),


  on(AnimalActions.getHousingStagesAux, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getHousingStagesAuxSuccess, (state, { housingStages }) => ({
    ...state,
    housingStages,
    loading: false,
  })),

  on(AnimalActions.getHousingStagesAuxFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(AnimalActions.applicationAnimal, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(AnimalActions.applicationAnimalSuccess, (state,  {application} ) => ({
    ...state,
    application,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(AnimalActions.applicationAnimalFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),

);

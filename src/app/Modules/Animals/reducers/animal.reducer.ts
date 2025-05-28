import { createReducer, on } from '@ngrx/store';
import * as AnimalActions from '../actions/animal.action'
import { AnimalDTO } from '../models/animal.dto';
import { AuxiliarEntityDTO } from 'src/app/Shared/Models/auxiliar-entity.dto';
import { UserDTO } from '../../Users/models/user.dto';

export interface AnimalState {
  animals: AnimalDTO[];
  species: AuxiliarEntityDTO[],
  status: AuxiliarEntityDTO[];
  ageCategories: AuxiliarEntityDTO[];
  genres: AuxiliarEntityDTO[];
  sizes: AuxiliarEntityDTO[];
  energyLevels: AuxiliarEntityDTO[];
  housingStages: AuxiliarEntityDTO[];
  loading: boolean;
  error: any;
}

export const initialState: AnimalState = {
  animals: [],
  species:[],
  status: [],
  ageCategories: [],
  genres: [],
  sizes: [],
  energyLevels: [],
  housingStages: [],
  loading: false,
  error: null,
};

export const animalReducer = createReducer(
  initialState,
  on(AnimalActions.getAllAnimals, state => ({
    ...state,
    loading: true
  })),

  on(AnimalActions.getAllAnimalsSuccess, (state, { animals }) => ({
    ...state,
    animals,
    loading: false,
  })),

  on(AnimalActions.getAllAnimalsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
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

);

import { AuxiliarEntityDTO } from "src/app/Shared/Models/auxiliar-entity.dto";

export interface Animal {
  id: number;
  name: string;
  location: string;
  description: string;
  weight: string;
  height: string;
  identifier: boolean;
  vaccines: boolean;
  sterilization: boolean;
  care: string;
  created_at: string;
  updated_at: string;

  species_id: number;
  status_id: number;
  agecategory_id: number;
  genre_id: number;
  housing_stage_id: number;
  size_id: number;
  energylevel_id: number;

  species: AuxiliarEntityDTO;
  status: AuxiliarEntityDTO;
  genre: AuxiliarEntityDTO;
  age_category: AuxiliarEntityDTO;
  size: AuxiliarEntityDTO;
  energy_level: AuxiliarEntityDTO;
  housing_stage: AuxiliarEntityDTO;
}

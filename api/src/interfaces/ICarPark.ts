import { IOutputter } from "./IOutputter";
import { CarparkCategoryEnum } from "../enums/CarparkCategoryEnum";

export interface ICarpark extends IOutputter {
  totalLots: number;
  availableLots: number;
  carparkCategory: CarparkCategoryEnum;
  carparkNumber: string;

  getTotalLots: () => number;
  getAvailableLots: () => number;
  getCarparkCategory: () => CarparkCategoryEnum;
  getCarparkNumber: () => string;
}

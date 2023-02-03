import { ICarpark } from "../interfaces/ICarpark";
import { CarparkCategoryEnum } from "../enums/CarParkCategoryEnum-test";

export class Carpark implements ICarpark {
  totalLots: number;
  availableLots: number;
  carparkCategory: CarparkCategoryEnum;
  carparkNumber: string;

  constructor(
    totalLots: number,
    availableLots: number,
    carparkCategory: CarparkCategoryEnum,
    carparkNumber: string
  ) {
    this.totalLots = totalLots;
    this.availableLots = availableLots;
    this.carparkCategory = carparkCategory;
    this.carparkNumber = carparkNumber;
  }

  getTotalLots() {
    return this.totalLots;
  }

  getAvailableLots() {
    return this.availableLots;
  }

  getCarparkCategory() {
    return this.carparkCategory;
  }

  getCarparkNumber() {
    return this.carparkNumber;
  }

  toJSON() {
    return {
      total_lot: this.totalLots,
      lots_available: this.availableLots,
      carpark_category: this.carparkCategory,
      carpark_number: this.carparkNumber,
    };
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

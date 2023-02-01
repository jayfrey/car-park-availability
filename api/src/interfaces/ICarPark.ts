import { IOutputter } from "./IOutputter";
import { CarParkCategory } from "../enums/CarParkCategory";

interface ICarPark extends IOutputter {
  totalLots: number;
  availableLots: number;
  carParkCategory: CarParkCategory;
  carParkNumber: string;

  getTotalLots: () => number;
  getAvailableLots: () => number;
  getCarParkCategory: () => CarParkCategory;
  getCarParkNumber: () => string;
}

export { ICarPark };

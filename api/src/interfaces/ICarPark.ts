import { IOutputter } from "./IOutputter";
import { CarParkCategoryEnum } from "../enums/CarParkCategoryEnum";

interface ICarPark extends IOutputter {
  totalLots: number;
  availableLots: number;
  carParkCategory: CarParkCategoryEnum;
  carParkNumber: string;

  getTotalLots: () => number;
  getAvailableLots: () => number;
  getCarParkCategory: () => CarParkCategoryEnum;
  getCarParkNumber: () => string;
}

export { ICarPark };

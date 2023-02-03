import { ICarpark } from "../interfaces/ICarpark";
import {
  CarparkCategoryEnum,
  getCarparkCategoryName,
} from "../enums/CarparkCategoryEnum";

type CategorisedCarparkAvailability = {
  small: CarparkNumberAvailability | null;
  medium: CarparkNumberAvailability | null;
  big: CarparkNumberAvailability | null;
  large: CarparkNumberAvailability | null;
};

type CarparkNumberAvailability = {
  lowest: {
    availableLots: number;
    carparkNumbers: string[];
  };
  highest: {
    availableLots: number;
    carparkNumbers: string[];
  };
};

export class AppService {
  carparks: ICarpark[];

  constructor(carparks: ICarpark[]) {
    this.carparks = carparks;
  }

  groupCarParksByCategory() {
    return this.carparks.reduce<Record<CarparkCategoryEnum, ICarpark[]>>(
      (
        categorisedCarparks: Record<CarparkCategoryEnum, ICarpark[]>,
        carPark: ICarpark
      ) => {
        let carparkCategory = carPark.getCarparkCategory();
        categorisedCarparks[carparkCategory] =
          categorisedCarparks[carparkCategory] || [];
        categorisedCarparks[carparkCategory].push(carPark);
        return categorisedCarparks;
      },
      Object.create(null)
    );
  }

  sortCarparksByAvailableLots(carparks: ICarpark[]) {
    return carparks.sort((carparkA: ICarpark, carparkB: ICarpark) => {
      return carparkA.getAvailableLots() - carparkB.getAvailableLots();
    });
  }

  getCarparkNumbersByLowestAndHighestAvailableLots() {
    // Group car park by category
    let categorisedCarparks: Record<CarparkCategoryEnum, ICarpark[]> =
      this.groupCarParksByCategory();

    let categorisedCarparkAvailability: CategorisedCarparkAvailability = {
      small: Object.create(null),
      medium: Object.create(null),
      big: Object.create(null),
      large: Object.create(null),
    };

    [
      CarparkCategoryEnum.SMALL,
      CarparkCategoryEnum.MEDIUM,
      CarparkCategoryEnum.BIG,
      CarparkCategoryEnum.LARGE,
    ].forEach((carparkCategory: CarparkCategoryEnum) => {
      // Sort by lots available ascendingly
      categorisedCarparks[carparkCategory] = this.sortCarparksByAvailableLots(
        categorisedCarparks[carparkCategory]
      );

      const lowestAvailableLots: number =
        categorisedCarparks[carparkCategory][0].getAvailableLots();
      const highestAvailableLots: number =
        categorisedCarparks[carparkCategory][
          categorisedCarparks[carparkCategory].length - 1
        ].getAvailableLots();

      console.log("lowestAvailableLots", lowestAvailableLots);
      console.log("highestAvailableLots", highestAvailableLots);

      // Group car park number by lowest and highest available lots
      const carparkNumbers: Record<string, string[]> = categorisedCarparks[
        carparkCategory
      ].reduce<Record<string, string[]>>(
        (carparkNumbers: Record<string, string[]>, carPark: ICarpark) => {
          if (lowestAvailableLots == carPark.getAvailableLots()) {
            carparkNumbers["lowest"] = carparkNumbers["lowest"] || [];
            carparkNumbers["lowest"].push(carPark.getCarparkNumber());
          }

          if (highestAvailableLots == carPark.getAvailableLots()) {
            carparkNumbers["highest"] = carparkNumbers["highest"] || [];
            carparkNumbers["highest"].push(carPark.getCarparkNumber());
          }
          return carparkNumbers;
        },
        Object.create(null)
      );

      categorisedCarparkAvailability[getCarparkCategoryName(carparkCategory)] =
        {
          lowest: {
            availableLots: lowestAvailableLots,
            carparkNumbers: carparkNumbers["lowest"],
          },
          highest: {
            availableLots: highestAvailableLots,
            carparkNumbers: carparkNumbers["highest"],
          },
        };
    });

    return categorisedCarparkAvailability;
  }
}

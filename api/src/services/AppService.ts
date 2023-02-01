import { ICarPark } from "../interfaces/ICarPark";
import {
  CarParkCategoryEnum,
  getCarParkCategoryName,
} from "../enums/CarParkCategoryEnum";

type CategorisedCarParkAvailability = {
  small: CarParkNumberAvailability | null;
  medium: CarParkNumberAvailability | null;
  big: CarParkNumberAvailability | null;
  large: CarParkNumberAvailability | null;
};

type CarParkNumberAvailability = {
  lowest: {
    availableLots: number;
    carParkNumbers: string[];
  };
  highest: {
    availableLots: number;
    carParkNumbers: string[];
  };
};

export class AppService {
  carParks: ICarPark[];

  constructor(carParks: ICarPark[]) {
    this.carParks = carParks;
  }

  groupCarParksByCategory() {
    return this.carParks.reduce<Record<CarParkCategoryEnum, ICarPark[]>>(
      (
        categorisedCarParks: Record<CarParkCategoryEnum, ICarPark[]>,
        carPark: ICarPark
      ) => {
        let carParkCategory = carPark.getCarParkCategory();
        categorisedCarParks[carParkCategory] =
          categorisedCarParks[carParkCategory] || [];
        categorisedCarParks[carParkCategory].push(carPark);
        return categorisedCarParks;
      },
      Object.create(null)
    );
  }

  sortCarParksByAvailableLots(carPark: ICarPark[]) {
    return carPark.sort((a: ICarPark, b: ICarPark) => {
      return a.getAvailableLots() - b.getAvailableLots();
    });
  }

  getCarParkNumbersByLowestAndHighestAvailableLots() {
    // Group car park by category
    let categorisedCarParks: Record<CarParkCategoryEnum, ICarPark[]> =
      this.groupCarParksByCategory();

    let categorisedCarParkAvailability: CategorisedCarParkAvailability = {
      small: Object.create(null),
      medium: Object.create(null),
      big: Object.create(null),
      large: Object.create(null),
    };

    [
      CarParkCategoryEnum.SMALL,
      CarParkCategoryEnum.MEDIUM,
      CarParkCategoryEnum.BIG,
      CarParkCategoryEnum.LARGE,
    ].forEach((carParkCategory: CarParkCategoryEnum) => {
      // Sort by lots available ascendingly
      categorisedCarParks[carParkCategory] = this.sortCarParksByAvailableLots(
        categorisedCarParks[carParkCategory]
      );

      const lowestAvailableLots: number =
        categorisedCarParks[carParkCategory][0].getAvailableLots();
      const highestAvailableLots: number =
        categorisedCarParks[carParkCategory][
          categorisedCarParks[carParkCategory].length - 1
        ].getAvailableLots();

      console.log("lowestAvailableLots", lowestAvailableLots);
      console.log("highestAvailableLots", highestAvailableLots);

      // Group car park number by lowest and highest available lots
      const carParkNumbers: Record<string, string[]> = categorisedCarParks[
        carParkCategory
      ].reduce<Record<string, string[]>>(
        (carParkNumbers: Record<string, string[]>, carPark: ICarPark) => {
          if (lowestAvailableLots == carPark.getAvailableLots()) {
            carParkNumbers["lowest"] = carParkNumbers["lowest"] || [];
            carParkNumbers["lowest"].push(carPark.getCarParkNumber());
          }

          if (highestAvailableLots == carPark.getAvailableLots()) {
            carParkNumbers["highest"] = carParkNumbers["highest"] || [];
            carParkNumbers["highest"].push(carPark.getCarParkNumber());
          }
          return carParkNumbers;
        },
        Object.create(null)
      );

      categorisedCarParkAvailability[getCarParkCategoryName(carParkCategory)] =
        {
          lowest: {
            availableLots: lowestAvailableLots,
            carParkNumbers: carParkNumbers["lowest"],
          },
          highest: {
            availableLots: highestAvailableLots,
            carParkNumbers: carParkNumbers["highest"],
          },
        };
    });

    return categorisedCarParkAvailability;
  }
}

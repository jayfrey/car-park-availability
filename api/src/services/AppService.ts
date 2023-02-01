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
  lowestAvailable: number;
  highestAvailable: number;
  lowestCarParkNumbers: string[];
  highestCarParkNumbers: string[];
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

      const lowestAvailable: number =
        categorisedCarParks[carParkCategory][0].getAvailableLots();
      const highestAvailable: number =
        categorisedCarParks[carParkCategory][
          categorisedCarParks[carParkCategory].length - 1
        ].getAvailableLots();

      console.log("lowestAvailable", lowestAvailable);
      console.log("highestAvailable", highestAvailable);

      // Group car park number by lowest and highest available lots
      const carParkNumbers: Record<string, string[]> = categorisedCarParks[
        carParkCategory
      ].reduce<Record<string, string[]>>(
        (carParkNumbers: Record<string, string[]>, carPark: ICarPark) => {
          if (lowestAvailable == carPark.getAvailableLots()) {
            carParkNumbers["lowestCarParkNumbers"] =
              carParkNumbers["lowestCarParkNumbers"] || [];
            carParkNumbers["lowestCarParkNumbers"].push(
              carPark.getCarParkNumber()
            );
          }

          if (highestAvailable == carPark.getAvailableLots()) {
            carParkNumbers["highestCarParkNumbers"] =
              carParkNumbers["highestCarParkNumbers"] || [];
            carParkNumbers["highestCarParkNumbers"].push(
              carPark.getCarParkNumber()
            );
          }
          return carParkNumbers;
        },
        Object.create(null)
      );

      categorisedCarParkAvailability[getCarParkCategoryName(carParkCategory)] =
        {
          lowestAvailable,
          highestAvailable,
          lowestCarParkNumbers: carParkNumbers["lowestCarParkNumbers"],
          highestCarParkNumbers: carParkNumbers["highestCarParkNumbers"],
        };
    });

    return categorisedCarParkAvailability;
  }
}

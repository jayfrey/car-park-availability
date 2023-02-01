import { StatusCodes } from "http-status-codes";
import {
  CarParkCategory,
  getCarParkCategory,
  getCarParkCategoryName,
} from "../enums/CarParkCategory";
import { ICarPark } from "../interfaces/ICarPark";
import { getCarParkAvailability } from "../services/callAPI";
import { CarPark } from "../models/CarPark";

type GetCarParkResponse = {
  small: CarParkNumberAavailability | null;
  medium: CarParkNumberAavailability | null;
  big: CarParkNumberAavailability | null;
  large: CarParkNumberAavailability | null;
};

type CarParkNumberAavailability = {
  lowest_available: number;
  highest_available: number;
  lowest_car_park_numbers: string[];
  highest_car_park_numbers: string[];
};

export class AppController {
  async getCarPark(_: any, res: any) {
    const carParkAvailability: any = await getCarParkAvailability();

    let carParks: ICarPark[] = [];

    carParkAvailability.data.items[0].carpark_data.map((carPark: any) => {
      carPark.carpark_info.map((info: any) => {
        const totalLots = parseInt(info.total_lots);
        const carParkCategory = getCarParkCategory(totalLots);

        carParks.push(
          new CarPark(
            totalLots,
            info.lots_available,
            carParkCategory,
            carPark.carpark_number
          )
        );
      });
    });

    // Group car park by category
    let categorisedCarParks = carParks.reduce(
      (categorisedCarParks, carPark) => {
        let carParkCategory = carPark.getCarParkCategory();
        categorisedCarParks[carParkCategory] =
          categorisedCarParks[carParkCategory] || [];
        categorisedCarParks[carParkCategory].push(carPark);
        return categorisedCarParks;
      },
      Object.create(null)
    );

    let response: GetCarParkResponse = {
      small: Object.create(null),
      medium: Object.create(null),
      big: Object.create(null),
      large: Object.create(null),
    };

    [
      CarParkCategory.SMALL,
      CarParkCategory.MEDIUM,
      CarParkCategory.BIG,
      CarParkCategory.LARGE,
    ].forEach((carParkCategory: CarParkCategory) => {
      // Sort by lots available ascendingly
      categorisedCarParks[carParkCategory].sort((a: ICarPark, b: ICarPark) => {
        return a.getAvailableLots() - b.getAvailableLots();
      });

      const lowestAvailable =
        categorisedCarParks[carParkCategory][0].getAvailableLots();
      const highestAvailable =
        categorisedCarParks[carParkCategory][
          categorisedCarParks[carParkCategory].length - 1
        ].getAvailableLots();

      console.log("lowestAvailable", lowestAvailable);
      console.log("highestAvailable", highestAvailable);

      // Group car park number by lowest lots available and highest lots available
      const carParkNumbers = categorisedCarParks[carParkCategory].reduce(
        (carParkNumbers: any, carPark: ICarPark) => {
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

      response[getCarParkCategoryName(carParkCategory)] = {
        lowest_available: lowestAvailable,
        highest_available: highestAvailable,
        lowest_car_park_numbers: carParkNumbers["lowestCarParkNumbers"],
        highest_car_park_numbers: carParkNumbers["highestCarParkNumbers"],
      };
    });

    res.status(StatusCodes.OK).json(response);
  }
}

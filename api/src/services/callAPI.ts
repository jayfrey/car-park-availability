import { ICarPark } from "../interfaces/ICarPark";
import { CarPark } from "../models/CarPark";
import { getCarParkCategory } from "../enums/CarParkCategory";
import appConfig from "../configs/app";
import moment from "moment";
import axios from "axios";

export async function getCarParkAvailability() {
  const response: any = await axios.get(appConfig.carParkAvailabilityUrl, {
    params: {
      date_time: moment().format(),
    },
  });

  return response;

  //   let carParks: ICarPark[] = [];

  //   response.data.items[0].carpark_data.map((carPark: any) => {
  //     carPark.carpark_info.map((info: any) => {
  //       const totalLots = parseInt(info.total_lots);
  //       const carParkCategory = getCarParkCategory(totalLots);

  //       carParks.push(
  //         new CarPark(
  //           totalLots,
  //           info.lots_available,
  //           carParkCategory,
  //           carPark.carpark_number
  //         )
  //       );
  //     });
  //   });

  //   return carParks;
}

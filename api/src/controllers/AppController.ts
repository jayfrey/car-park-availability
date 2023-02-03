import { StatusCodes } from "http-status-codes";
import { getCarParkCategoryEnum } from "../enums/CarParkCategoryEnum";
import { ICarPark } from "../interfaces/ICarPark";
import { fetchCarParkAvailability } from "../callAPI";
import { CarPark } from "../models/CarPark";
import { AppService } from "../services/AppService";

export class AppController {
  async getCarParkAvailability(_: any, res: any) {
    try {
      const carParkAvailability: any = await fetchCarParkAvailability();

      let carParks: ICarPark[] = [];

      carParkAvailability.data.items[0].carpark_data.map((carPark: any) => {
        carPark.carpark_info.map((info: any) => {
          const totalLots = parseInt(info.total_lots);
          const carParkCategory = getCarParkCategoryEnum(totalLots);

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

      const appService = new AppService(carParks);
      const categorisedCarParkAvailability =
        appService.getCarParkNumbersByLowestAndHighestAvailableLots();
      res.status(StatusCodes.OK).json(categorisedCarParkAvailability);
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while getting car park availability",
        error: err,
      });
    }
  }
}

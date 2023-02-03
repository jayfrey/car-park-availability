import { StatusCodes } from "http-status-codes";
import { getCarparkCategoryEnum } from "../enums/CarparkCategoryEnum";
import { ICarpark } from "../interfaces/ICarpark";
import { fetchCarparkAvailability } from "../callAPI";
import { Carpark } from "../models/Carpark";
import { AppService } from "../services/AppService";

export class AppController {
  async getCarparkAvailability(_: any, res: any) {
    try {
      const carparkAvailability: any = await fetchCarparkAvailability();

      let carparks: ICarpark[] = [];

      carparkAvailability.data.items[0].carpark_data.map((carpark: any) => {
        carpark.carpark_info.map((info: any) => {
          const totalLots = parseInt(info.total_lots);
          const carparkCategory = getCarparkCategoryEnum(totalLots);

          carparks.push(
            new Carpark(
              totalLots,
              info.lots_available,
              carparkCategory,
              carpark.carpark_number
            )
          );
        });
      });

      const appService = new AppService(carparks);
      const categorisedCarparkAvailability =
        appService.getCarparkNumbersByLowestAndHighestAvailableLots();
      res.status(StatusCodes.OK).json(categorisedCarparkAvailability);
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while getting carpark availability",
        error: err,
      });
    }
  }
}

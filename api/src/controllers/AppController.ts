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
        let totalLots: number = 0;
        let availableLots: number = 0;

        carpark.carpark_info.map((info: any) => {
          totalLots = totalLots + parseInt(info.total_lots);
          availableLots = availableLots + parseInt(info.lots_available);
        });

        const carparkCategory = getCarparkCategoryEnum(totalLots);

        carparks.push(
          new Carpark(
            totalLots,
            availableLots,
            carparkCategory,
            carpark.carpark_number
          )
        );
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

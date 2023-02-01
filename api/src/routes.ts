import { AppController } from "./controllers/AppController";
import { StatusCodes } from "http-status-codes";

export default (app: any) => {
  app.get("/healthcheck", (req: any, res: any) => {
    res.sendStatus(StatusCodes.OK);
  });
  app.get("/car-park/availability", new AppController().getCarParkAvailability);
};

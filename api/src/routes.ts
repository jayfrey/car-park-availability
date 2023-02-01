import { AppController } from "./controllers/AppController";

export default (app: any) => {
  app.get("/car-park/availability", new AppController().getCarPark);
};

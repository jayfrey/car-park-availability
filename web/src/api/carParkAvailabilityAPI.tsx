import axios from "axios";
import appConfig from "../configs/app";

export async function fetchCarParkAvailability() {
  const response: any = await axios.get(appConfig.carParkAvailabilityUrl);
  return response.data;
}

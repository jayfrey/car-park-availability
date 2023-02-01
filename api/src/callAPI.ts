import appConfig from "./configs/app";
import moment from "moment";
import axios from "axios";

export async function fetchCarParkAvailability() {
  const response: any = await axios.get(appConfig.carParkAvailabilityUrl, {
    params: {
      date_time: moment().format(),
    },
  });

  console.log(response.request.res.responseUrl);

  return response;
}

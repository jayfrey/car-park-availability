import axios from 'axios'
import appConfig from '../configs/app'

export async function fetchCarparkAvailability() {
  const response = await axios.get(appConfig.carparkAvailabilityUrl)
  return response.data
}

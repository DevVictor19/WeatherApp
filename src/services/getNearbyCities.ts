import { geoApi } from '../lib/axios';
import { City } from '../models/City';

async function getNearbyCities(
  prefix: string,
  coord: { lat: number; lon: number }
) {
  const { lat, lon } = coord;

  const { data: responseData } = await geoApi.get<{ data: City[] }>(
    `/locations/${lat}${lon}/nearbyCities?radius=100&namePrefix=${prefix}&offset=0&languageCode=pt-br`
  );

  return responseData.data;
}

export default getNearbyCities;

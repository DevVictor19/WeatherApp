import { geoApi } from '../lib/axios';
import { City } from '../models/City';

async function getCities(prefix: string) {
  const { data: responseData } = await geoApi.get<{ data: City[] }>(
    `/cities?offset=0&languageCode=pt-br&minPopulation=1000000&namePrefix=${prefix}`
  );

  return responseData.data;
}

export default getCities;

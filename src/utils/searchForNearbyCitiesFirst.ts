import getNearbyCities from '../services/getNearbyCities';
import getCities from '../services/getCities';

async function searchForNearbyCitiesFirst(
  prefix: string,
  userLocation: { lat: number; lon: number }
) {
  let results = await getNearbyCities(prefix, userLocation);

  if (results.length === 0) {
    results = await new Promise((resolve) => {
      setTimeout(() => {
        getCities(prefix).then(resolve);
      }, 1000);
    });
  }

  return results;
}

export default searchForNearbyCitiesFirst;

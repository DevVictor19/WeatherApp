import { useState } from 'react';

import { City } from '../../models/City';

import getCities from '../../services/getCities';
import getNearbyCities from '../../services/getNearbyCities';
import getUserLocation, { UserLocation } from '../../utils/getUserLocation';
import Input from './Input';
import ResultsList from './ResultsList';

import Container from './styles';

const searchForLocalCitiesFirst = async (
  prefix: string,
  userLocation: { lat: number; lon: number }
) => {
  let results = await getNearbyCities(prefix, userLocation);

  if (results.length === 0) {
    results = await new Promise((resolve) => {
      setTimeout(() => {
        getCities(prefix).then(resolve);
      }, 1000);
    });
  }

  return results;
};

function Search() {
  const [cities, setCities] = useState<City[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation>(null);

  const handleInputChange = (inputValue: string) => {
    const prefix = inputValue.trim();

    if (prefix === '') {
      setCities([]);
      return;
    }

    if (userLocation) {
      searchForLocalCitiesFirst(prefix, userLocation)
        .then(setCities)
        .catch(() => setCities([]));
    } else {
      getCities(prefix)
        .then(setCities)
        .catch(() => setCities([]));
    }
  };

  const handleInputClick = () => {
    if (userLocation) return;

    getUserLocation()
      .then(setUserLocation)
      .catch(() => setUserLocation(null));
  };

  return (
    <Container>
      <h1>Como está o tempo hoje?</h1>
      <Input
        type="text"
        placeholder="Digite o nome da cidade"
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      {cities.length > 0 && <ResultsList results={cities} />}
    </Container>
  );
}

export default Search;

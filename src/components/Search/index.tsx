import { useState } from 'react';

import { City } from '../../models/City';

import getCities from '../../services/getCities';
import searchForNearbyCitiesFirst from '../../utils/searchForNearbyCitiesFirst';
import getUserLocation, { UserLocation } from '../../utils/getUserLocation';
import Input from './Input';
import ResultsList from './ResultsList';

import Container from './styles';

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
      searchForNearbyCitiesFirst(prefix, userLocation)
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
        placeholder="Digite o nome da cidade"
        onChange={handleInputChange}
        onClick={handleInputClick}
      />
      {cities.length > 0 && <ResultsList results={cities} />}
    </Container>
  );
}

export default Search;

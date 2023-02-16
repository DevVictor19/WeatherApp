import { City } from '../../../models/City';

import StyledList from './styles';

interface ResultsListProps {
  results: City[];
}

function ResultsList(props: ResultsListProps) {
  const { results } = props;

  return (
    <StyledList>
      {results.map((city) => (
        <li key={city.id}>{city.name}</li>
      ))}
    </StyledList>
  );
}

export default ResultsList;

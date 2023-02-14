import Input from './Input';
import ResultsList from './ResultsList';

import Container from './styles';

const dummyResults = ['Salvador', 'Bahia', 'Paris', 'Floripa', 'Blumenau'];

function Search() {
  return (
    <Container>
      <h1>Como está o tempo hoje?</h1>
      <Input type="text" placeholder="Digite o nome da cidade" />
      <ResultsList results={dummyResults} />
    </Container>
  );
}

export default Search;

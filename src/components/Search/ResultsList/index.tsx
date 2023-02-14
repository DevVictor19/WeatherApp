import StyledList from './styles';

interface ResultsListProps {
  results: string[];
}

function ResultsList(props: ResultsListProps) {
  const { results } = props;

  return (
    <StyledList>
      {results.map((value) => (
        <li key={value}>{value}</li>
      ))}
    </StyledList>
  );
}

export default ResultsList;

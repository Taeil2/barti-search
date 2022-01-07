import styled from 'styled-components';

const Autocomplete = (props) => {
  const { results, selectName } = props;

  return <AutocompleteContainer>
    <AutocompleteList>
      {results.map(result => (
        <li key={result.id} onClick={() => selectName(result)}>{result.firstName} {result.lastName}</li>
      ))}
    </AutocompleteList>
  </AutocompleteContainer>
};

const AutocompleteContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
`;

const AutocompleteList = styled.ul`
  margin: 0;
  padding: 0;
  li  {
    list-style: none;
    cursor: pointer;
    padding: 7px 5px;
    &:hover {
      background: #d1f7f5;
    }
  }
`;

export default Autocomplete;
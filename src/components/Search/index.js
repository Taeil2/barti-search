import { useEffect, useRef, useState } from 'react';

import Autocomplete from '../Autocomplete';
import styled from 'styled-components';

const Search = () => {
  const [ search, setSearch ] = useState('');
  const [ autocomplete, setAutocomplete ] = useState([]);
  const [ searchHistory, setSearchHistory ] = useState([]);
  const searchTimer = useRef();

  // Set search between refreshes
  useEffect(() => {
    const bartiSearch = localStorage.getItem('bartiSearch');
    if (bartiSearch) {
      setSearch(bartiSearch);
    }
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search !== '') {
      searchTimer.current = setTimeout(() => {
        displayResults(e.target.value);
      }, 1000)
    }
  };

  const displayResults = (search) => {
    const matchingHistory = searchHistory.filter(result => {
      const name = `${result.firstName} ${result.lastName}`;
      return name.toLowerCase().includes(search);
    });

    fetch(`https://6195803474c1bd00176c6d9a.mockapi.io/api/v1/patient?search=${search}`)
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(person => {
          const matching = matchingHistory.filter(person2 => person.id === person2.id);
          if (matching.length) {
            return false;
          }
          return true;
        });
        setAutocomplete([...matchingHistory, ...filteredData]);
      });
  };

  const selectName = (result) => {
    const name = `${result.firstName} ${result.lastName}`;
    setSearch(name);
    setAutocomplete([]);
    localStorage.setItem('bartiSearch', name);
    if (!searchHistory.includes(result)) {
      setSearchHistory([result, ...searchHistory]);
    }
  };

  return (
    <SearchContainer>
      <SearchBar type="text" value={search} onChange={(e) => { handleSearch(e) }} />
      <Autocomplete results={autocomplete} selectName={selectName} />
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  width: 300px;
  margin: auto;
`;

const SearchBar = styled.input`
  width: 100%;
  height: 30px;
  margin-top: 50px;
`;

export default Search;
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './SearchComponent.css';

interface Preview {
  text: string;
  position: number;
}

interface SearchResult {
  id: number;
  name: string;
  content_previews: Preview[];
  path: string;
}
interface Suggestion {
  word: string;
  // Include other properties if they exist
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const location = useLocation();
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const response = await axios.get<Suggestion[]>(`http://localhost:8000/api/get-suggestions?q=${searchQuery}`);
      setSuggestions(response.data.map((suggestion: Suggestion) => suggestion.word));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get('q');

    // Define an async function inside useEffect
    const fetchData = async () => {
      if (queryParam) {
        setIsSearching(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/search-word?q=${queryParam}`);
          setQuery(queryParam); // Update the query state
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsSearching(false);
        }
      }
    };

    // Call the async function
    fetchData();
  }, [location]);

  const handleSuggestionClick = (suggestedWord: string) => {
    setQuery(suggestedWord); // Update the query state for future use
    handleSearch(suggestedWord); // Pass the suggestion directly to handleSearch
  };


  const handleSearch = async (searchQuery = query) => {
    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/search-word?q=${searchQuery}`);
      setSearchResults(response.data);

      if (response.data.length === 0) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsSearching(false);
    }
  };


  const handleResultClick = (resultId: number, position: number) => {
    window.location.href = `/document/${resultId}?query=${encodeURIComponent(query)}&position=${position}`;
    console.log(position)
  };


  return (
  <div className="search-container">
    <input
      className="search-input"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
    <button 
      className="search-button"
      onClick={() => { handleSearch(query); }}
      disabled={isSearching}
    >
      Search
    </button>

    <div className="search-results">
      {searchResults.length > 0 ? (
        searchResults.map((result) => (
          <div key={result.id} className="search-result">
            <span>{result.name}</span>
            <br />
            <span>{result.path}</span>
            {result.content_previews.map((preview, index) => (
              <p key={index} onClick={() => handleResultClick(result.id, preview.position)}>
                {preview.text}
              </p>
            ))}
          </div>))
      ) : (
        suggestions.length > 0 && (
          <div className="search-suggestions">
            <div>Suggestions:</div>
            {suggestions.map((suggestion, index) => (
              <p key={index} className="suggestion" onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </p>
            ))}
          </div>
        )
      )}
    </div>
  </div>
);

};

export default SearchComponent;

import React, { useState } from 'react';
import axios from 'axios';

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

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/search-word?q=${query}`);

      setSearchResults(response.data);
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
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch} disabled={isSearching}>
        Search
      </button>
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            <span>{result.name}</span>
            <br />
            <span>{result.path}</span>
            {result.content_previews.map((preview, index) => (
            <p key={index} onClick={() => handleResultClick(result.id, preview.position)}>
            {preview.text}
          </p>
          
            ))}
          </div>
        ))}

      </div>
    </div>
  );
};

export default SearchComponent;

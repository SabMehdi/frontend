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

  const handleResultClick = (resultId: number) => {
    // Redirect to the document view
    window.location.href = `/document/${resultId}`;
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
          <div key={result.id} onClick={() => handleResultClick(result.id)}>
            <h4>{result.name}</h4>
            {result.content_previews.map((preview, index) => (
              <p key={index}>{preview.text}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;

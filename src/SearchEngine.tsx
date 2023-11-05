import React, { useState } from 'react';
import axios from 'axios';
import './SearchComponent.css'; // Make sure to create this CSS file

interface Suggestion {
    id: number;
    name: string;
    content_preview: string
}

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);

        if (value.length > 1) {
            try {
                const response = await axios.get(`http://localhost:8000/api/autocomplete/?q=${value}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                className="search-input"
            />
            {suggestions.length > 0 && (
                <ul className="suggestions-dropdown">
                    {suggestions.map((suggestion) => (

                        <li key={suggestion.id} className="suggestion-item">
                            <h4>{suggestion.name}</h4>
                            {suggestion.content_preview}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchComponent;

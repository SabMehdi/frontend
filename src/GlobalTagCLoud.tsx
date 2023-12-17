import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import SimpleTagCloud from './SimpleTagCloud';
import './TagCloudPage.css';

interface Tag {
  value: string;
  count: number;
}

const GlobalTagCloud: React.FC = () => {
    const [aggregatedData, setAggregatedData] = useState<Record<string, number>>({});
    const [minOccurrences, setMinOccurrences] = useState(0); // New state for minimum occurrences

    useEffect(() => {
        const fetchAggregatedData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get-aggregated-inverted-index/');
                setAggregatedData(response.data);
            } catch (error) {
                console.error('Error fetching aggregated data:', error);
            }
        };

        fetchAggregatedData();
    }, []);

    const handleMinOccurrencesChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMinOccurrences(Number(event.target.value));
    };

    // Explicitly define the type of acc as Record<string, number>
    const filteredData: Record<string, number> = Object.entries(aggregatedData)
        .filter(([_, count]) => count >= minOccurrences)
        .reduce((acc: Record<string, number>, [word, count]) => {
            acc[word] = count;
            return acc;
        }, {});

    // Convert filteredData to the format expected by SimpleTagCloud component
    // and assert the type of count as number
    const tags: Tag[] = Object.entries(filteredData).map(([word, count]) => ({
        value: word,
        count: count as number, // Asserting the type of count as number
    }));

    return (
        <div className="tag-cloud-container">
            <h2 className="tag-cloud-header">Nuage de mots Global</h2>

            <div className="tag-cloud-input-container">
                <label>
                    Minimum d'occurrence:
                    <input className="tag-cloud-input" type="number" value={minOccurrences} onChange={handleMinOccurrencesChange} min="0" />
                </label>
            </div>
            <SimpleTagCloud tags={tags} />
        </div>
    );
};

export default GlobalTagCloud;

import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import TagCloud from './TagCloud';
import './TagCloudPage.css';

interface WordData {
  positions: number[];
  pos: string;
  original: string;
}

function TagCloudPage() {
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [invertedIndexData, setInvertedIndexData] = useState<Record<string, WordData>>({});
  const [minOccurrences, setMinOccurrences] = useState(0); // New state for minimum occurrences

  useEffect(() => {
    // Fetch the file names from the backend
    axios.get('http://localhost:8000/api/get-file-names/')
      .then(response => {
        setFileNames(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleFileSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedFileName = event.target.value;
    setSelectedFile(selectedFileName);

    try {
      const response = await axios.get(`http://localhost:8000/api/get-inverted-index/${selectedFileName}`);
      setInvertedIndexData(response.data); // Make sure the data format matches WordData
    } catch (error) {
      console.error(error);
    }
  };

  const handleMinOccurrencesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMinOccurrences(Number(event.target.value));
  };

  // Filter the invertedIndexData based on minOccurrences before passing to TagCloud
  const filteredInvertedIndexData = Object.fromEntries(
    Object.entries(invertedIndexData).filter(([_, data]) => data.positions.length >= minOccurrences)
  );

  return (
    <div className="tag-cloud-container">
      <h2 className="tag-cloud-header">Select a File for Tag Cloud</h2>
      <select className="tag-cloud-select" onChange={handleFileSelect}>
        <option value="">Select a file</option>
        {fileNames.map(fileName => (
          <option key={fileName} value={fileName}>
            {fileName}
          </option>
        ))}
      </select>
  
      <div className="tag-cloud-input-container">
        <label>
          Minimum Occurrences:
          <input className="tag-cloud-input" type="number" value={minOccurrences} onChange={handleMinOccurrencesChange} min="0" />
        </label>
      </div>
  
      <TagCloud invertedIndexData={filteredInvertedIndexData} />
    </div>
  );
  
}

export default TagCloudPage;

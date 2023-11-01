import React, { useState, useEffect,ChangeEvent } from 'react';
import axios from 'axios';
import TagCloud from './TagCloud';

function TagCloudPage() {
  const [fileNames, setFileNames] = useState([]);
const [selectedFile, setSelectedFile] = useState('');
const [invertedIndexData, setInvertedIndexData] = useState<{ [key: string]: number[] }>({});

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
    
    console.log(selectedFileName)
    setSelectedFile(selectedFileName);

    try {
      const response = await axios.post(`http://localhost:8000/api/get-inverted-index/${selectedFileName}`);

      setInvertedIndexData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

 
  return (
    <div>
      <select onChange={handleFileSelect}>
        <option value="">Select a file</option>
        {fileNames.map(fileName => (
          <option key={fileName} value={fileName}>
            {fileName}
          </option>
        ))}
      </select>

      {/* Render TagCloud component here */}
      <TagCloud invertedIndexData={invertedIndexData} />
    </div>
  );
}

export default TagCloudPage;

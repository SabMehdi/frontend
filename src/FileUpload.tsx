import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const FileUpload = () => {
  const [invertedIndex, setInvertedIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setError(null); // Clear any previous error message
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file.'); // Set the error message
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axios.post('http://localhost:8000/api/process-text/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setInvertedIndex(response.data.inverted_index);
    } catch (error: AxiosError | any) {
      if (error.response) {
          // The request was made, but the server responded with an error
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
          // The request was made, but no response was received
        console.error('No Response from Server:', error.request);
      } else {
          // Something else happened while setting up the request
        console.error('Request Error:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>Upload a Text File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      {invertedIndex && (
        <div>
          <h2>Inverted Index:</h2>
          <pre>{JSON.stringify(invertedIndex, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [invertedIndex, setInvertedIndex] = useState(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Specify the type of selectedFile

  // Explicitly specify the type of 'event'
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      // Handle the case where no file is selected
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
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>Upload a Text File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
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

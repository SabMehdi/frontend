import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './FileUpload.css';
type WordData = {
  positions: number[];
  pos: string;
};

type InvertedIndex = Record<string, WordData>;

const FileUpload = () => {
  const [invertedIndex, setInvertedIndex] = useState<InvertedIndex | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeDirectory = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/analyze_directory/');  // URL of your new Django view
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      // ... error handling ...
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
        setError('Veuillez choisir un fichier!');
        return;
    }
    setLoading(true)
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
        const response = await axios.post('http://localhost:8000/api/process-single-file/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false)
        setInvertedIndex(response.data.processed_data);
      //console.log(response.data.inverted_index)
    } catch (error: AxiosError | any) {
      setLoading(false)
      if (error.response && error.response.status === 400) {
      } setError('Ce fichier a déjà été analysé.');
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('No Response from Server:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
    }
  };


  const renderResultTable = () => {
    if (loading) {
      return <div>Chargement...</div>;
    }

    if (!invertedIndex) {
      return null;
    }

    const fileName = selectedFile?.name || 'Unknown File';

    const tableRows = Object.entries(invertedIndex).map(([word, data], index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{word}</td>
        <td>{data.pos}</td> {/* Display POS */}
        <td>{data.positions.length}</td>
        <td>{data.positions.join(', ')}</td>
      </tr>
    ));

    return (

      <div style={{ textAlign: 'center' }}>

        <h2>{fileName}, {tableRows.length} mots</h2>
        <table style={{ margin: '0 auto', border: '1px solid' }}>
          <thead>
            <tr>
              <th>N°</th>
              <th>Mot</th>
              <th>Type</th> {/* Added column for POS */}
              <th>Fréquence</th>
              <th>Occurrence</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    );
  };


  return (
    <div className="file-upload-container">
      <h1 className="file-upload-header">Veuiller sélectionner un fichier</h1>
      <input className="file-upload-input" type="file" onChange={handleFileChange}  title="choisir un fichier" />
      <button className="file-upload-button" onClick={handleUpload}>Analyser un fichier</button>
      <button className="file-upload-button" onClick={handleAnalyzeDirectory}>Analyser un repertoire</button> {/* Reintegrated button */}
      {error && <div className="error-message">{error}</div>}
      {renderResultTable()}
    </div>
  );
  

};

export default FileUpload;

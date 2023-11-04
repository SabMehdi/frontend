import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import './FileUpload.css';
type InvertedIndex = Record<string, number[]>;

const FileUpload = () => {
  const [invertedIndex, setInvertedIndex] = useState<InvertedIndex | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading]=useState(false);

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
      const response = await axios.post('http://localhost:8000/api/process-text/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false)
      setInvertedIndex(response.data.inverted_index);
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
    if(loading){
      return <div>chargement...</div>
    }
    if (!invertedIndex) {
      return null; 
    }

    const fileName = selectedFile?.name || 'Unknown File';
    
    const tableRows = Object.entries(invertedIndex).map(([word, occurrences], index) => (
      
      <tr key={index}>
        <td>{index}</td>
        <td>{word}</td>
        <td>{occurrences.length}</td>
        <td>{occurrences.join(', ')}</td>
      </tr>

    ));

    return (
      <div style={{textAlign:'center'}}>
        <h2>{fileName}, {tableRows.length} mots   </h2>
        <table style={{ margin: '0 auto',border:'1px solid' }}>

          <thead>
            <tr >
              <th >N°</th>  
              <th>Mot</th>  
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
    <div>
      <h1>Veuiller séléctionner un fichier</h1>
      <input type="file" onChange={handleFileChange} accept=".txt" title="choisir un fichier" />
      <button onClick={handleUpload}>Analyser</button>
      {error && <div className="error-message">{error}</div>}
      {renderResultTable()}
    </div>
  );
};

export default FileUpload;

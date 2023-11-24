import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

interface DocumentData {
  name: string;
  content: string;
  path: string;
}

const DocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [documentData, setDocumentData] = useState<DocumentData | null>(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query');

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/document/${id}/`);
        setDocumentData(response.data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, [id]);

  const highlightQuery = (content: string, query: string | null) => {
    if (!query) return content;
    const regex = new RegExp(`(${query})`, 'gi');
    return content.split(regex).map((part, index) => 
      regex.test(part) ? <span key={index} style={{ color: 'red' }}>{part}</span> : part
    );
  };

  return (
    <div>
      <h1>{documentData?.name}</h1>
      <h2>{documentData?.path}</h2>
      <div>{documentData && highlightQuery(documentData.content, searchQuery)}</div>
    </div>
  );
};

export default DocumentPage;

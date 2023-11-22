import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [documentContent, setDocumentContent] = useState<string>('');

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/document/${id}`);
        setDocumentContent(response.data.content);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, [id]);

  return (
    <div>
      <h1>Document {id}</h1>
      <div>{documentContent}</div>
    </div>
  );
};

export default DocumentPage;

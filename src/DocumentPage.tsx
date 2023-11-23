import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [documentContent, setDocumentContent] = useState<string>('');
  const [title, setTitle] = useState(null)
  const [path, setPath] = useState(null)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/document/${id}/`);
        setTitle(response.data.name)
        setDocumentContent(response.data.content);
        setPath(response.data.path)
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, [id]);

  return (
    <div>
      <h1>{title}</h1>
      <h2>{path}</h2>

      <div>{documentContent}</div>
    </div>
  );
};

export default DocumentPage;

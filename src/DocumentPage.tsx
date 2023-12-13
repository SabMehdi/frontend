import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import './DocumentPage.css'
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
  const highlightPosition = parseInt(queryParams.get('position') || '0', 10);

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
  const highlightQueryAtPosition = (content:string, query:string, position:number) => {
    if (!query) return content;
  
    let start = content.toLowerCase().indexOf(query.toLowerCase(), position);
    if (start === -1) return content; // Query not found at the specified position
  
    let end = start + query.length;
  
    let before = content.substring(0, start);
    let highlighted = content.substring(start, end);
    let after = content.substring(end);
  
    return (
      <span>
        {before}
        <span style={{ backgroundColor: 'yellow', color: 'black' }}>{highlighted}</span>
        {after}
      </span>
    );
  };
  
  const renderedContent = documentData && searchQuery
    ? highlightQueryAtPosition(documentData.content, searchQuery, highlightPosition)
    : documentData?.content;

  return (
    <div>
      <h1>{documentData?.name}</h1>
      <h2>{documentData?.path}</h2>
      <div className="document-content">{renderedContent}</div>
    </div>
  );
};
export default DocumentPage;

import React from 'react';
import { Link } from 'react-router-dom';
import './FileUpload.css';

interface WordData {
  positions: number[];
  pos: string;
  original: string; // Store the original word
}

interface TagCloudProps {
  invertedIndexData: Record<string, WordData>;
}

const TagCloud: React.FC<TagCloudProps> = ({ invertedIndexData }) => {
  // Function to calculate the font size based on the frequency
  const calculateFontSize = (frequency: number): number => {
    return Math.log2(frequency) * 10 + 12; // Increased multiplier for larger variation
  };

  // Function to calculate the color based on the frequency
  const calculateColor = (frequency: number): string => {
    const colors = ['#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DB6AC', '#81C784', '#AED581'];
    const index = frequency % colors.length;
    return colors[index];
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {Object.entries(invertedIndexData).map(([lemma, data]) => (
        <Link
          to={`/search?q=${encodeURIComponent(data.original)}`}
          className="tag-cloud-link" // Add this class
          style={{
            fontSize: `${calculateFontSize(data.positions.length)}px`,
            color: calculateColor(data.positions.length),
            margin: '10px',
            transition: 'transform 0.1s ease',
            cursor: 'pointer',
          }}
          title={`Occurrences: ${data.positions.length}`}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          key={lemma}
        >
          {data.original}
        </Link>

      ))}
    </div>
  );
};

export default TagCloud;

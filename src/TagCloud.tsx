import React from 'react';

interface TagCloudProps {
  invertedIndexData: { [key: string]: number[] };
}

const TagCloud: React.FC<TagCloudProps> = ({ invertedIndexData }) => {
  const calculateFontSize = (frequency: number): number => {
    return Math.log2(frequency) * 5 + 12; 
  };

  const calculateColor = (frequency: number): string => {
    const colors = ['#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DB6AC', '#81C784', '#AED581'];
    const index = frequency % colors.length;
    return colors[index];
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {Object.entries(invertedIndexData).map(([word, occurrences]) => (
        <span
          key={word}
          style={{
            fontSize: `${calculateFontSize(occurrences.length)}px`,
            color: calculateColor(occurrences.length),
            margin: '10px',
            transition: 'transform 0.1s ease',
            cursor: 'pointer',
          }}
          title={`Occurrences: ${occurrences.length}`}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default TagCloud;

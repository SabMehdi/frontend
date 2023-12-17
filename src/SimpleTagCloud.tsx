import React from 'react';

interface Tag {
  value: string;
  count: number;
}

interface SimpleTagCloudProps {
  tags: Tag[];
}

const SimpleTagCloud: React.FC<SimpleTagCloudProps> = ({ tags }) => {
  const calculateFontSize = (count: number): number => {
    return Math.log2(count) * 10 + 12;
  };

  const calculateColor = (count: number): string => {
    const colors = ['#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DB6AC', '#81C784', '#AED581'];
    return colors[count % colors.length];
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {tags.map((tag, index) => (
        <div
          key={index}
          style={{
            fontSize: `${calculateFontSize(tag.count)}px`,
            color: calculateColor(tag.count),
            margin: '10px',
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title={`Occurrences: ${tag.count}`}
          >
          {tag.value}
        </div>
      ))}
    </div>
  );
};

export default SimpleTagCloud;

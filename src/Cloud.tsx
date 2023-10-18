import React from 'react';


const TagCloudComponent = ({ /* invertedIndex */ }) => {
  /* if (!invertedIndex) {
    return null; // No data to display
  }

  // Convert the invertedIndex data to an array of tags
  const tags = Object.entries(invertedIndex).map(([word, occurrences]) => ({
    value: word,
    count: occurrences.length,
  }));

  return (
    <div>
      <h2>Tag Cloud</h2>
      <ReactTagCloud
        tags={tags}
        minSize={12}
        maxSize={35}
        onClick={(tag) => console.log(tag.value)}
      />
    </div>
  ); */
};

export default TagCloudComponent;

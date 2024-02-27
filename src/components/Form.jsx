import React from 'react';
import EditorComponent from './EditorComponent';

const JODEDITROR = () => {
  const handleDataChange = (data) => {
    console.log('Data from editor:', data);
  };
  return (
    <div>
      <div>
        <EditorComponent onDataChange={handleDataChange} />
      </div>
    </div>
  );
};

export default JODEDITROR;

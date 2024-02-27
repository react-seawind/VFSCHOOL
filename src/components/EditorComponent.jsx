// EditorComponent.js
import React, { useState } from 'react';
import JoditEditor from 'jodit-react';

const EditorComponent = ({ onDataChange }) => {
  const [content, setContent] = useState('');
  const config = {
    uploader: {
      insertImageAsBase64URI: false,
    },
  };
  const handleContentChange = (newContent) => {
    setContent(newContent);
    onDataChange(newContent); // Notify parent component about data change
  };

  return (
    <div>
      <JoditEditor
        value={content}
        onChange={handleContentChange}
        config={config}
      />
    </div>
  );
};

export default EditorComponent;

// NewEditor.js
import React from 'react';
import TinyMCEEditor from './Editor';

const ContentEditor = ({ onChange }) => {
  return <TinyMCEEditor onChange={onChange} />;
};

export default ContentEditor;

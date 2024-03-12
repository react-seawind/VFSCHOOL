// MainForm.js
import React, { useState } from 'react';
import NewEditor from './EDITOR/NewEditor';

const MainForm = () => {
  const [editorContent, setEditorContent] = useState({
    editor1: '',
    editor2: '',
  });

  const myHandler = (content, editorName) => {
    setEditorContent({ ...editorContent, [editorName]: content });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    localStorage.setItem('Editor data', JSON.stringify(editorContent));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label>Editor 1</label>
        <NewEditor onChange={(content) => myHandler(content, 'editor1')} />
      </div>
      <div>
        <label>Editor 2</label>
        <NewEditor onChange={(content) => myHandler(content, 'editor2')} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MainForm;

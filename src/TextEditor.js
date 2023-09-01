// src/TextEditor.js
import React, { useState, useRef } from 'react';
import './TextEditor.css';

function TextEditor() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const contentRef = useRef(null);

  const handleToggleStyle = (style) => {
    if (style === 'bold') {
      setBold(!bold);
    } else if (style === 'italic') {
      setItalic(!italic);
    } else if (style === 'underline') {
      setUnderline(!underline);
    }
  };

  const applyInlineStyles = () => {
    let styles = '';
    if (bold) styles += 'font-weight: bold;';
    if (italic) styles += 'font-style: italic;';
    if (underline) styles += 'text-decoration: underline;';
    contentRef.current.setAttribute('style', styles);
  };

  const handleTextChange = () => {
    applyInlineStyles();
  };

  return (
    <div>
      <h1>Advanced Inline Text Editor</h1>
      <div>
        <button
          className={bold ? 'active' : ''}
          onClick={() => handleToggleStyle('bold')}
        >
          Bold
        </button>
        <button
          className={italic ? 'active' : ''}
          onClick={() => handleToggleStyle('italic')}
        >
          Italic
        </button>
        <button
          className={underline ? 'active' : ''}
          onClick={() => handleToggleStyle('underline')}
        >
          Underline
        </button>
      </div>
      <div
        className="editor"
        contentEditable="true"
        ref={contentRef}
        onInput={handleTextChange}
      ></div>
    </div>
  );
}

export default TextEditor;

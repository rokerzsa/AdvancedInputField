import React from 'react';

const InsertCustomElementButton = ({ editor }) => {
  const handleClick = () => {
    const customElement = {
      type: 'custom-element',
      children: [{ text: 'Custom Element' }],
    };
    editor.insertNode(customElement);
  };

  return (
    <button onClick={handleClick}>
      Insert Custom Element
    </button>
  );
};

export default InsertCustomElementButton;

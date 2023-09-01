import React, { useEffect, useRef, useState } from 'react';

const EditCaretPositioning = () => {
  const [htmlContent, setHtmlContent] = useState('<p>This is an editable div.</p>');
  const [caretPosition, setCaretPosition] = useState(null);
  const divRef = useRef(null);

  useEffect(() => {
    // Get the initial caret position when the component mounts
    getCaretPosition();
  }, []);

  const handleChange = () => {
    // Get the current caret position
    const newPosition = getCaretPosition();
    // Update the HTML content
    setHtmlContent(divRef.current.innerHTML);
    setCaretPosition(newPosition);
  };

  const getCaretPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return range.startOffset;
    }
    return null;
  };

  useEffect(() => {
    // Restore the caret position after rendering
    if (caretPosition !== null) {
      const selection = window.getSelection();
      const range = document.createRange();
      const node = divRef.current.firstChild;

      if (node && node.nodeType === Node.TEXT_NODE) {
        range.setStart(node, caretPosition);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [caretPosition]);

  return (
    <div
      ref={divRef}
      contentEditable={true}
      onInput={handleChange}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default EditCaretPositioning;

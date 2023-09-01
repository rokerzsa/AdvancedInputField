import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw, Modifier } from 'draft-js';
import { InlineMath } from 'react-katex';
import { renderToString } from 'react-dom/server';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const MyEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onUnderlineClick = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  const hasMathFunction = (currentEditorState) => {
    const selectionState = currentEditorState.getSelection();
    const contentState = currentEditorState.getCurrentContent();
  
    // Get the selected block
    const blockKey = selectionState.getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
  
    // Check if the selected block contains any math function entities
    const entityRanges = block.getEntityRanges();
    return entityRanges.some((range) => {
      const entity = contentState.getEntity(range.getEntity());
      return entity.getType() === 'MATH_FUNCTION';
    });
  }

  const onMathFunctionClick = () => {
    // You can implement your logic to insert the math function component here.
    // For demonstration purposes, we'll insert a placeholder text.

    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    
    // Create a placeholder text (e.g., '[MathFunctionComponent]') for the math function
    const placeholderText = renderToString(<InlineMath>hi</InlineMath>);
    
    // Insert the placeholder text into the content
    const newContentState = Modifier.insertText(
      contentState,
      selectionState,
      placeholderText
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    setEditorState(newEditorState);
  };
  
  console.log(editorState.getCurrentContent().getPlainText())

  return (
    <div>
      <div>
        <button onClick={onBoldClick}>B</button>
        <button onClick={onItalicClick}>I</button>
        <button onClick={onUnderlineClick}>U</button>
        <button onClick={onMathFunctionClick}>Math</button>
      </div>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};

export default MyEditor;

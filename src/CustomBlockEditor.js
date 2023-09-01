import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator, AtomicBlockUtils, Modifier, ContentBlock, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const CustomBlock = (props) => {
  const { contentState, block } = props;
  const entityKey = block.getEntityAt(0);
  if (entityKey) {
    const entity = contentState.getEntity(entityKey);
    const data = entity.getData();

    return (
      <div className="custom-block">
        <button onClick={()=>{}}>Custom Button</button>
      </div>
    );
  }
  return null;
};

const blockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === 'custom-block') {
    return {
      component: CustomBlock,
      editable: false,
    };
  }
  return null;
};

const CustomBlockEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

   function insertTeXBlock(editorState) {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'TOKEN',
      'IMMUTABLE',
      {content: "\\frac{1}{2}"},
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      {currentContent: contentStateWithEntity},
    );
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  }

  return (
    <div>
      <button onClick={handleBoldClick}>Bold</button>
      <button onClick={insertTeXBlock}>Insert Custom Block</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={blockStyleFn}
      />
    </div>
  );
};

export default CustomBlockEditor;

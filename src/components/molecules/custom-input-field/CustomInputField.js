import { CompositeDecorator, Editor, EditorState, Entity, RichUtils, convertToRaw } from 'draft-js'
import React, { useRef, useState } from 'react'
import { insertTeXBlock } from './helper'
import TexBlock from '../../atoms/tex-block/TexBlock'
import { content } from './helper/content'


const findCustomEntity = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "TEXBLOCK"
      );
    },
    callback
  );
};

// Create a decorator that applies the strategy
const decorator = new CompositeDecorator([
  {
    strategy: findCustomEntity,
    component: TexBlock, // Your custom entity component
  },
]);

const CustomInputField = () => {

  const editorRef = useRef()

  const [editorState, setEditorState] = useState(EditorState.createWithContent(content, decorator))

  const handleEditorFocus = () => { editorRef.current.focus() }

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState)
  }

  const handleKeyCommand = (command, editorState) => {
    var newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return true;
    }
    return false;
  };

  const insertTeX = () => {
    const newEditorState = insertTeXBlock(editorState)
    console.log(convertToRaw(newEditorState.getCurrentContent()))
    setEditorState(newEditorState)
  };


  return (
    <div onClick={handleEditorFocus}>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={handleEditorChange}
        placeholder="Type a question"
        ref={editorRef}
        spellCheck={true}
      />
      <button onClick={() => insertTeX()} className="TeXEditor-insert">
        {'Insert new TeX'}
      </button>
    </div>
  )
}

export default CustomInputField
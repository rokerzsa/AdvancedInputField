import { Editor, EditorState, RichUtils } from 'draft-js'
import { Map } from 'immutable'
import React, { createRef, useRef, useState } from 'react'
import { content } from './helper/content'
import { insertTeXBlock, removeTeXBlock } from './helper'
import TexBlock from '../../atoms/tex-block/TexBlock'

const CustomInputField = () => {

  const editorRef = createRef

  const [editorState, setEditorState] = useState(EditorState.createWithContent(content))
  
  const [liveTeXEdits, setLiveTeXEdits] = useState(Map())

  const blockRenderer = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: TexBlock,
        editable: false,
        props: {
          onStartEdit: (blockKey) => {
            setLiveTeXEdits(liveTeXEdits.set(blockKey, true));
          },
          onFinishEdit: (blockKey, newContentState) => {
            setLiveTeXEdits(liveTeXEdits.remove(blockKey));
            setEditorState(EditorState.createWithContent(newContentState))
          },
          onRemove: (blockKey) => removeTeX(blockKey),
        },
      };
    }
    return null;
  };

  const handleEditorFocus = () => { editorRef.current.focus() }
  const handleEditorChange = (newEditorState) => { setEditorState(newEditorState) }

  const handleKeyCommand = (command, editorState) => {
    var newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return true;
    }
    return false;
  };


  const removeTeX = (blockKey) => {
    setLiveTeXEdits(liveTeXEdits.remove(blockKey));
    setEditorState(removeTeXBlock(editorState, blockKey))
  };

  const insertTeX = () => {
    setLiveTeXEdits(Map());
    setEditorState(insertTeXBlock(editorState))
  };

  return (
    <div onClick={handleEditorFocus}>
      <Editor
        blockRendererFn={blockRenderer}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={handleEditorChange}
        placeholder="Start a document..."
        readOnly={liveTeXEdits.count()}
        ref={editorRef}
        spellCheck={true}
      />
      <button onClick={insertTeX} className="TeXEditor-insert">
        {'Insert new TeX'}
      </button>
    </div>
  )
}

export default CustomInputField
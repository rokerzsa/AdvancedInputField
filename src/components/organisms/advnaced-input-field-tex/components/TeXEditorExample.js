'use strict';

import Draft, { CompositeDecorator, convertToRaw } from 'draft-js';
import React from 'react';

import { content } from '../data/content';
import { insertTeXBlock } from '../modifiers/insertTeXBlock';
import TeXBlock from './TeXBlock';

var { Editor, EditorState, RichUtils } = Draft;

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
    component: TeXBlock, // Your custom entity component
  },
]);


export default class TeXEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(content, decorator),
      rawState:{}
    };

    this._focus = () => this.refs.editor.focus();
    this._onChange = (editorState) => this.setState({ editorState });

    // this._handleKeyCommand = (command, editorState) => {
    //   var newState = RichUtils.handleKeyCommand(editorState, command);
    //   if (newState) {
    //     this._onChange(newState);
    //     return true;
    //   }
    //   return false;
    // };

    this._insertTeX = () => {
      this.setState({
        editorState: insertTeXBlock(this.state.editorState),
      });
    };
  }

  /**
   * While editing TeX, set the Draft editor to read-only. This allows us to
   * have a textarea within the DOM.
   */
  render() {
    return (
      <div className="TexEditor-container">
        <div className="TeXEditor-root">
          <div className="TeXEditor-editor" onClick={this._focus}>
            <Editor
              editorState={this.state.editorState}
              // handleKeyCommand={this._handleKeyCommand}
              onChange={this._onChange}
              placeholder="Start a document..."
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        <button onClick={this._insertTeX} className="TeXEditor-insert">
          {'Insert new TeX'}
        </button>
      </div>
    );
  }
}

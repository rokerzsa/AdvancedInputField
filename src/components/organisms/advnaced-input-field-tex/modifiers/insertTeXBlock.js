/**
 * Copyright (c) Facebook, Inc. and its affiliates. All rights reserved.
 *
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

import {
  AtomicBlockUtils,
  EditorState,
  Modifier,
} from 'draft-js';

let count = 0;
const examples = [
  '\\int_a^bu\\frac{d^2v}{dx^2}\\,dx\n' +
  '=\\left.u\\frac{dv}{dx}\\right|_a^b\n' +
  '-\\int_a^b\\frac{du}{dx}\\frac{dv}{dx}\\,dx',

  'P(E) = {n \\choose k} p^k (1-p)^{ n-k} ',

  '\\tilde f(\\omega)=\\frac{1}{2\\pi}\n' +
  '\\int_{-\\infty}^\\infty f(x)e^{-i\\omega x}\\,dx',

  '\\frac{1}{(\\sqrt{\\phi \\sqrt{5}}-\\phi) e^{\\frac25 \\pi}} =\n' +
  '1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}\n' +
  '{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } }',
];

// export function insertTeXBlock(editorState) {
//   const contentState = editorState.getCurrentContent();

//   const contentStateWithEntity = contentState.createEntity(
//       'TEXBLOCK',
//       'IMMUTABLE',
//       {}
//   );

//   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

//   const currentSelectionState = editorState.getSelection();

//   const contentStateEntityApplied = Modifier.replaceText(
//       contentState,
//       currentSelectionState,
//       ' ',
//       undefined,
//       entityKey
//   )

//   const newEditorState = EditorState.push(
//       editorState,
//       contentStateEntityApplied,
//       'insert-fragment'
//   )

//   return newEditorState

//   return EditorState.forceSelection(
//       newEditorState,
//       contentStateEntityApplied.getSelectionAfter()
//   );

// }

export const insertTeXBlock = (editorState) => {
  const contentState = editorState.getCurrentContent();

  const contentStateWithEntity = contentState.createEntity(
    'TEXBLOCK',
    'IMMUTABLE',
    {}
  );

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const currentSelectionState = editorState.getSelection();

  const contentStateEntityApplied = Modifier.insertText(
    contentState,
    currentSelectionState,
    '      ',
    null,
    entityKey
  )
  
  const newEditorState = EditorState.push(
    editorState,
    contentStateEntityApplied,
    'insert-fragment'
  )

  return newEditorState
  // return EditorState.forceSelection(
  //   newEditorState,
  //   contentStateEntityApplied.getSelectionAfter()
  // );
}


// export function insertTeXBlock(editorState) {

//   const contentState = editorState.getCurrentContent();
//   const selectionState = editorState.getSelection();
//   const contentStateWithEntity = contentState.createEntity('TEXBLOCK', 'IMMUTABLE', {});
//   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();


//   let entityInsertedContent = Modifier.replaceText(
//     contentState,
//     selectionState,
//     ``,
//     editorState.getCurrentInlineStyle(),
//     entityKey
//   );

//   const blockKey = selectionState.getAnchorKey();
//   const blockSize = contentState.getBlockForKey(blockKey).getLength();
//   if (blockSize === 0) {
//     entityInsertedContent = Modifier.insertText(
//       entityInsertedContent,
//       entityInsertedContent.getSelectionAfter(),
//       ' '
//     );
//   }

//   const newEditorState = EditorState.push(
//     editorState,
//     entityInsertedContent,
//     'insert-fragment'
//   );

//   return EditorState.forceSelection(
//     newEditorState,
//     entityInsertedContent.getSelectionAfter()
//   )
// }



// const contentStateWithEntity = editorState
// .getCurrentContent()
// .createEntity(getTypeByTrigger(mentionTrigger), entityMutability, {
//   mention,
// });

// const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

// const currentSelectionState = editorState.getSelection();
// const { begin, end } = getSearchText(editorState, currentSelectionState, [
// mentionTrigger,
// ]);

// // get selection of the @mention search text
// const mentionTextSelection = currentSelectionState.merge({
// anchorOffset: begin,
// focusOffset: end,
// });

// let mentionReplacedContent = Modifier.replaceText(
// editorState.getCurrentContent(),
// mentionTextSelection,
// `${mentionPrefix}${mention.name}`,
// editorState.getCurrentInlineStyle(),
// entityKey
// );

// // If the mention is inserted at the end, a space is appended right after for
// // a smooth writing experience.
// const blockKey = mentionTextSelection.getAnchorKey();
// const blockSize = editorState
// .getCurrentContent()
// .getBlockForKey(blockKey)
// .getLength();
// if (blockSize === end) {
// mentionReplacedContent = Modifier.insertText(
//   mentionReplacedContent,
//   mentionReplacedContent.getSelectionAfter(),
//   ' '
// );
// }

// const newEditorState = EditorState.push(
// editorState,
// mentionReplacedContent,
// 'insert-fragment'
// );
// return EditorState.forceSelection(
// newEditorState,
// mentionReplacedContent.getSelectionAfter()
// );
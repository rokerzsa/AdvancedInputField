import {
    AtomicBlockUtils,
    BlockMapBuilder,
    ContentBlock,
    ContentState,
    EditorState,
    Entity,
    Modifier,
    convertFromRaw,
    convertToRaw,
    genKey,
} from 'draft-js';


export const insertTeXBlock = (editorState) => {

    const contentState = editorState.getCurrentContent();
    const selectionState = contentState.getSelectionAfter();

    const contentStateWithEntity = contentState.createEntity(
        'TEXBLOCK',
        'IMMUTABLE',
        {},
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const finalContentState = Modifier.applyEntity(
        contentStateWithEntity,
        selectionState,
        entityKey,
    );

    const newEditorState = EditorState.set(editorState, {
        currentContent: finalContentState,
    });

    return newEditorState;

    console.log(convertToRaw(newEditorState.getCurrentContent()))




    // const currentEntity = contentStateWithEntity.getEntity(entityKey)

    // const newEntityMap = contentState
    //     .getEntityMap()

    // newEntityMap.add(currentEntity)
    // // .set(entityKey, currentEntity)
    // // .toSeq()
    // // .toOrderedMap()
    // // .toArray()

    // console.log(newEntityMap)

    // console.log(contentState
    //     .getEntityMap())

    // const newBlockArray = contentState
    //     .getBlocksAsArray()

    // const newContentState = ContentState.createFromBlockArray(newBlockArray, newEntityMap)

    // console.log(contentState.getBlockMap())

    // console.log(convertToRaw(newContentState))

    // console.log(currentEntityArray)

    // const entityAppliedContentState = Modifier.applyEntity(contentStateWithEntity, contentStateWithEntity.getSelectionAfter(), entityKey)


    // const newEditorState = EditorState.push(editorState, entityAppliedContentState, 'apply-entity')



    // const currentEntity = contentStateWithEntity.get(entityKey)

    // const newEditorState = EditorState.set(
    //     editorState,
    //     { currentContent: contentStateWithEntity },
    // );

    // const newBlockArray = contentState
    //     .getBlocksAsArray();


    // contentState.addEntity(entityKey)

    // const newContentState = ContentState.createFromBlockArray(newBlockArray, contentStateWithEntity.getEntityMap())

    // const finalEditorStateAfterBlock = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')

    // const finalRawState = convertToRaw(finalEditorStateAfterBlock.getCurrentContent())

    // console.log(convertToRaw(newEditorState.getCurrentContent()))

    // return EditorState.createWithContent(newContentState)
    // const newBlock = new ContentBlock({
    //     key: genKey(),
    //     type: 'texblock',
    //     text: ' ', // Text for the block
    // });

    // const newBlockArray = contentState
    //     .getBlockMap()
    //     .set(newBlock.getKey(), newBlock)
    //     .toSeq()
    //     .toOrderedMap()
    //     .toArray()
    //     ;

    // const newContentState = ContentState.createFromBlockArray(newBlockArray)

    // console.log(convertToRaw(newContentState))

    // return EditorState.createWithContent(newContentState)

}


// export const removeTeXBlock = (editorState, blockKey) => {
//     var content = editorState.getCurrentContent();
//     var block = content.getBlockForKey(blockKey);

//     var targetRange = new SelectionState({
//         anchorKey: blockKey,
//         anchorOffset: 0,
//         focusKey: blockKey,
//         focusOffset: block.getLength(),
//     });

//     var withoutTeX = Modifier.removeRange(content, targetRange, 'backward');
//     var resetBlock = Modifier.setBlockType(
//         withoutTeX,
//         withoutTeX.getSelectionAfter(),
//         'unstyled',
//     );

//     var newState = EditorState.push(editorState, resetBlock, 'remove-range');
//     return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
// }

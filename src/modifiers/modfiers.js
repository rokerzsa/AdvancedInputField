import { Transforms } from "slate";

export const insertLatexNode = (editor, latex, editLatex) => {

    console.log({ editor, latex, editLatex })
    const { selection, children } = editor;

    let newPosition = []

    if (selection) {
        newPosition = [selection.anchor.path[0], selection.anchor.path[1] + 1]
    }
    else {
        const paraIndex = children.length - 1
        const lastNode = children[paraIndex].children.length - 1
        newPosition = [paraIndex, lastNode + 1]
    }

    const textNode = {
        type: 'tex',
        children: [{ text: '' }],
        state: {
            latex: latex,
            elementPosition: newPosition,
            editLatex: editLatex,
        }
    };
    Transforms.insertNodes(editor, textNode);
    Transforms.move(editor)
};


export const editLatexNode = (editor, latex, editLatex, elementPosition) => {
    const textNode = {
        type: 'tex',
        children: [{ text: `` }],
        state: {
            latex: latex,
            elementPosition: elementPosition,
            editLatex: editLatex,
        }
    };
    Transforms.setNodes(editor, textNode, { at: elementPosition })
    Transforms.move(editor)
}
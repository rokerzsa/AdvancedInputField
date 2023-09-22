import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isKeyHotkey } from 'is-hotkey'
import { Editable, withReact, useSlate, useSelected } from 'slate-react'
import * as SlateReact from 'slate-react'
import {
    Transforms,
    Editor,
    Range,
    createEditor,
    Element as SlateElement,
    Descendant,
} from 'slate'
import { withHistory } from 'slate-history'
import { withInlines } from './custom-slate'
import { Button, Icon, Toolbar } from './Components'
import { css } from '@emotion/css'
import { initialValue } from './initialValue'
import { deserialize, serialize } from './serialization'


const Element = props => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'tex':
            return <CustomTexComponent {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

const CustomTexComponent = ({ attributes, children, element }) => {
    const { latex, elementPosition } = element.state
    const editor = useSlate()



    const focused = SlateReact.useFocused()
    const selected = SlateReact.useSelected()


    console.log(editor)
    console.log(latex)
    console.log(elementPosition)

    const changeElement = () => {
        const textNode = {
            type: 'tex',
            children: [{ text: `Hi ${Math.random()}` }],
            state: {
                latex: `Hello ${Math.random()}`,
                elementPosition: elementPosition,
            }
        };
        Transforms.setNodes(editor, textNode, { at: elementPosition })
        Transforms.move(editor)
    }

    return (
        <span
            {...attributes}
            contentEditable={false}
            onClick={() => changeElement()}
            style={
                {
                    margin: "2px 3px",
                    border: focused && selected ? "2px solid red" : "1px solid black",
                    borderRadius: "4px",
                    padding: "3px"
                }
            }
        >
            {latex}{children}
        </span>
    )
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

// const insertTextNode = (editor) => {
//     const textNode = {
//         type: 'tex',
//         children: [{ text: `Hi ${Math.random()}` }]
//     }
//     Transforms.insertNodes(editor, textNode)
// }

const insertTextNode = (editor) => {

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
            latex: `Hello ${Math.random()}`,
            elementPosition: newPosition,
        }
    };
    Transforms.insertNodes(editor, textNode);
    Transforms.move(editor)
};



const AddTexButton = () => {
    const editor = useSlate()
    return (
        <Button
            // active={isLinkActive(editor)}
            onClick={() => {
                insertTextNode(editor)
            }}
        >
            <Icon>Tex</Icon>
        </Button>
    )
}


const AdvancedInputField = () => {
    const [value, setValue] = useState(null)
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(
        () => withInlines(withHistory(withReact(createEditor()))),
        []
    )
    return (
        <div>
            <button onClick={() => {
                // console.log(value)
                const serializedValue = serialize(editor)
                console.log(serializedValue)
                const html = serializedValue
                const document = new DOMParser().parseFromString(html, 'text/html')
                const deserializedValue = deserialize(document.body)
                console.log(deserializedValue)
            }}>Log</button>
            <SlateReact.Slate editor={editor} initialValue={initialValue} onChange={(value) => setValue(value)}
            >
                <Toolbar>
                    <AddTexButton />
                </Toolbar>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Enter some text..."
                />
            </SlateReact.Slate>
        </div>
    )
}

export default AdvancedInputField
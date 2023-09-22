import React, { useCallback, useMemo, useState } from 'react'
import { Editable, withReact } from 'slate-react'
import * as SlateReact from 'slate-react'
import {
    Editor,
    createEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import { withInlines } from '../../modifiers/custom-slate'
import { initialValue } from '../../constant/initialValue'
import Element from './components/elements/custom/Element'
import Leaf from './components/elements/leaf/Leaf'
import AddMathButton from './components/toolbar/add-math-button/AddMathButton'
import { Toolbar } from './components/toolbar/components/toolbar/Toolbar'
import { deserialize, serialize } from '../../utils/serialization'
import MathFunctionModal from './components/math-function-modal/MathFunctionModal'
import { editLatexNode, insertLatexNode, insertTextNode } from '../../modifiers/modfiers'



const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const MarkButton = ({ format, icon }) => {
    const editor = SlateReact.useSlate()
    return (
        <button
            //   active={isMarkActive(editor, format)}
            onMouseDown={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <span className='material-icons'>{icon}</span>
        </button>
    )
}

const AdvancedInputField = () => {
    const [value, setValue] = useState(null)
    const [isToolbarShown, setToolbarShown] = useState(false)
    const [isMathBarShown, setMathBarShown] = useState(false)
    const [isEditLatex, setEditLatex] = useState(false)
    const [currentElementPosition, setCurrentElementPosition] = useState([0, 0])
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const [initialLatex, setInitalLatex] = useState("")
    const editor = useMemo(
        () => withInlines(withReact(withHistory(createEditor()))),
        []
    )

    const showToolBar = () => {
        setToolbarShown(true)
    }

    const hideToolBar = () => {
        setToolbarShown(false)
    }


    const editLatex = ({ latex, elementPosition }) => {
        setInitalLatex(latex)
        setEditLatex(true)
        setCurrentElementPosition(elementPosition)
        setMathBarShown(true)
    }

    const edit = (latex) => {
        editLatexNode(editor, latex, editLatex, currentElementPosition)
        setInitalLatex("")
        setEditLatex(false)
        setCurrentElementPosition(() => ([0, 0]))
    }

    const save = (latex) => {
        insertLatexNode(editor, latex, editLatex)
    }

    return (
        <div>
            <SlateReact.Slate
                editor={editor}
                initialValue={initialValue}
            >
                {isMathBarShown && <MathFunctionModal
                    initialLatex={initialLatex}
                    isOpen={isMathBarShown}
                    setOpen={setMathBarShown}
                    save={save}
                    edit={edit}
                    isEdit={isEditLatex}
                />}
                <div style={{ display: isToolbarShown ? 'flex' : 'none', justifyContent: 'center' }}>
                    <button style={{ fontSize: 24, lineHeight: 1 }} onClick={() => {
                        // console.log(value)
                        const serializedValue = serialize(editor)
                        console.log(serializedValue)
                        const html = serializedValue
                        const document = new DOMParser().parseFromString(html, 'text/html')
                        const deserializedValue = deserialize(document.body)
                        console.log(deserializedValue)
                    }}>Log</button>
                    <MarkButton format="bold" icon="format_bold" />
                    <MarkButton format="italic" icon="format_italic" />
                    <MarkButton format="underline" icon="format_underlined" />
                    <MarkButton format="code" icon="code" />
                    <MarkButton format="superscript" icon="superscript" />
                    <MarkButton format="subscript" icon="subscript" />
                    <AddMathButton onClick={() => setMathBarShown(true)} />
                </div>

                <Editable
                    onFocus={() => {
                        showToolBar()
                    }}
                    style={{ border: "1px solid grey", width: "100%", padding: "5px" }}
                    onBlur={(e) => {
                        if (e.relatedTarget == null) {
                            hideToolBar()
                        }
                    }}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder='Type your question'
                    renderPlaceholder={({ children, attributes }) => (
                        <span {...attributes}>
                            <span style={{paddingTop:"10px",display:'flex', justifyContent:'center', alignItems:'center', fontSize:24}}>
                                {children}
                            </span>
                        </span>
                    )}
                />
            </SlateReact.Slate>
        </div>
    )
}

export { AdvancedInputField }
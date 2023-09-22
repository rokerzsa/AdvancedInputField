import { InlineMath } from "react-katex"
import { Transforms } from "slate"
import { useFocused, useSelected, useSlate } from "slate-react"

const DisplayMath = ({ attributes, children, element }) => {
    const { latex, elementPosition, editLatex } = element.state
    const editor = useSlate()
    const focused = useFocused()
    const selected = useSelected()
    // const changeElement = () => {
    //     const textNode = {
    //         type: 'tex',
    //         children: [{ text: `` }],
    //         state: {
    //             latex: `Hello ${Math.random()}`,
    //             elementPosition: elementPosition,
    //         }
    //     };
    //     Transforms.setNodes(editor, textNode, { at: elementPosition })
    //     Transforms.move(editor)
    // }
    return (
        <span
            {...attributes}
            contentEditable={false}
            onClick={() => editLatex({latex, elementPosition})}
            style={
                {
                    margin: "2px 3px",
                    border: focused && selected ? "2px solid red" : "2px solid black",
                    borderRadius: "10px",
                    padding: ".5em 1.2em",
                    fontSize:18,
                }
            }
        >
            <InlineMath math={latex} />
            {children}
        </span>
    )
}
export default DisplayMath
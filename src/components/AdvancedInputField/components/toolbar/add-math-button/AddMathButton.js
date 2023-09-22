import { ReactEditor, useSlate } from "slate-react"
import { insertTextNode } from "../../../../../modifiers/modfiers"

const AddMathButton = (props) => {
    const editor = useSlate()

    return (
        <button {...props}>
            <span className="material-icons">
                functions
            </span>
        </button>
    )
}

export default AddMathButton
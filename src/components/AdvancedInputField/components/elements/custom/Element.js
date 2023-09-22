import React from "react"
import DisplayMath from "./display-math/DisplayMath"
import DisplayCode from "./display-code/DisplayCode"

const Element = props => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'tex':
            return <DisplayMath {...props} />
        case 'code':
            return <DisplayCode {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

export default Element
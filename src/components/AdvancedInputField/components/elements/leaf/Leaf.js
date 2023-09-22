import React from "react"

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
    if (leaf.superscript) {
        children = <sup>{children}</sup>
    }
    if (leaf.subscript) {
        children = <sub>{children}</sub>
    }
    return <span style={{fontSize:20}} {...attributes}>{children}</span>
}

export default Leaf
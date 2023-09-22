import escapeHtml from 'escape-html'
import { jsx } from 'slate-hyperscript'
import { Text } from 'slate'

export const serialize = node => {

    if (Text.isText(node)) {
        let string = escapeHtml(node.text)
        if (node.bold) {
            string = `<strong>${string}</strong>`
        }
        return string
    }

    const children = node.children.map(n => serialize(n)).join('')

    switch (node.type) {
        case 'tex':
            return `<latex>${node.state.latex}</latex>`
        case 'paragraph':
            return `<slateline>${children}</slateline>`
        // case 'paragraph':
        //   return `<p>${children}</p>`
        // case 'link':
        //   return `<a href="${escapeHtml(node.url)}">${children}</a>`
        default:
            return children
    }
}

export const deserialize = (el, markAttributes = {}) => {
    if (el.nodeType === Node.TEXT_NODE) {
        return jsx('text', markAttributes, el.textContent)
    } else if (el.nodeType !== Node.ELEMENT_NODE) {
        return null
    }

    const nodeAttributes = { ...markAttributes }

    // define attributes for text nodes
    switch (el.nodeName) {
        case 'STRONG':
            nodeAttributes.bold = true
    }

    const children = Array.from(el.childNodes)
        .map(node => deserialize(node, nodeAttributes))
        .flat()

    if (children.length === 0) {
        children.push(jsx('text', nodeAttributes, ''))
    }

    const emptyChildrenNode = jsx('text', {}, '');

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children)
        case 'BR':
            return '\n'
        case 'LATEX':
            return jsx('element', { type: 'tex', state: { latex:children[0].text } }, emptyChildrenNode)
        case 'SLATELINE':
            return jsx('element', { type: 'paragraph' }, children)
        case 'P':
            return jsx('element', { type: 'paragraph' }, children)
        case 'A':
            return jsx(
                'element',
                { type: 'link', url: el.getAttribute('href') },
                children
            )
        default:
            return children
    }
}
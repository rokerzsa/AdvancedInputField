import React, { useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server';
import { InlineMath } from 'react-katex';

const StyledInputWithMath = ({latex}) => {
    const contentRef = useRef();
    const [html, setHtml] = useState('');
    const intitalCaretPosition = { position: 0, nodeIndex: -1, offsetNode: "", isDelete: false }
    const [caretPosition, setCaretPosition] = useState(intitalCaretPosition);
  
    const getCurrentNodeIndex = (currentNode) => {
      return Array.from(contentRef.current.childNodes).indexOf(currentNode)
    }
  
    const handleContentChange = (e) => {
      const content = e.target.innerHTML
      const isDelete = e.nativeEvent.inputType === "deleteContentBackward"
      setHtml(content);
      if (content) {
        updateCaretPosition(isDelete)
      }
      else {
        setCaretPosition(intitalCaretPosition);
      }
    };
  
    const updateCaretPosition = (isDelete) => {
      setCaretPosition(getCaretPosition(isDelete))
    }
  
    const getCaretPosition = (isDelete) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const currentNode = selection.anchorNode
        let nodeIndex = -1;
        let offsetNode = "child";
        if (currentNode.nodeType === Node.TEXT_NODE) {
          nodeIndex = getCurrentNodeIndex(currentNode)
        }
        else {
          nodeIndex = selection.anchorOffset
          offsetNode = "parent"
        }
        return { position: range.startOffset, nodeIndex: nodeIndex, offsetNode: offsetNode, isDelete: isDelete };
      }
      else {
        return { intitalCaretPosition }
      }
    }
  
    useEffect(() => {
      if (caretPosition.nodeIndex != -1) {
        if (caretPosition.offsetNode != "") {
          const parentNode = contentRef.current
          const childNode = parentNode.childNodes[caretPosition.nodeIndex]
          if (caretPosition.offsetNode === "child") {
            placeCaretAtPosition(childNode, caretPosition.position);
          }
          else {
            if (caretPosition.isDelete) {
              placeCaretAtPosition(parentNode, caretPosition.nodeIndex)
            } else {
              placeCaretAtPosition(parentNode, caretPosition.nodeIndex + 1)
            }
          }
        }
      }
    }, [caretPosition]);
  
    const placeCaretAtPosition = (node, position) => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(node, position);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    const onSpanClick = (e) => {
      e.stopPropagation()
        const el = e.target
        console.log(el)
    }
  
    const addSpan = () => {
      const caretPosition = getCaretPosition()
      const placeholder = document.createElement('span');
      placeholder.addEventListener('click', onSpanClick)
      placeholder.className = "math"
      placeholder.contentEditable = false
      placeholder.style={zIndex:"100000"}
      placeholder.innerHTML = renderToString(<InlineMath math={latex}/>);
      const updateCaretPoistion = { position: 0, nodeIndex: caretPosition.nodeIndex + 1, offsetNode: "parent", isDelete: false }
      const parentNode = contentRef.current
      const childNodes = parentNode.childNodes
      const currentNode = childNodes[caretPosition.nodeIndex]
      let previousNode = null;
      if (caretPosition.nodeIndex > 0) {
        previousNode = childNodes[caretPosition.nodeIndex - 1]
      }
      contentRef.current.focus()
      if (currentNode) {
        if (currentNode && currentNode.nodeType === Node.TEXT_NODE) {
          const currentNodeContent = currentNode.wholeText
          const firstPart = currentNodeContent.substring(0, caretPosition.position)
          const lastPart = currentNodeContent.slice(caretPosition.position)
          currentNode.textContent = firstPart;
          parentNode.insertBefore(placeholder, currentNode.nextSibling)
          if (lastPart) {
            const lastPartNode = document.createTextNode(lastPart)
            parentNode.insertBefore(lastPartNode, placeholder.nextSibling)
          }
          setCaretPosition(updateCaretPoistion)
        }
        else {
          if (previousNode && previousNode.nextSibling && previousNode) {
            parentNode.insertBefore(placeholder, previousNode.nextSibling)
          }
          else {
            parentNode.appendChild(placeholder);
            setHtml(parentNode.innerHTML);
          }
          setCaretPosition(caretPosition)
        }
      }
      else {
        parentNode.appendChild(placeholder);
        setHtml(parentNode.innerHTML);
        setCaretPosition(caretPosition)
      }
    };
  
    return (
      <div>
        <button onClick={() => addSpan()}>Add Function</button>
        <div
          style={{ border: '1px solid black', padding: '5px' }}
          ref={contentRef}
          contentEditable={true}
          onInput={handleContentChange}
          onClick={(e)=>e.stopPropagation()}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
}

export default StyledInputWithMath
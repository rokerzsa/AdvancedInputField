import React, { useEffect, useRef, useState } from 'react'

function ContentEditableWithArray() {

    const contentRef = useRef()
  
    const supportedTags = ["b", "u", "i", "math"];
  
    const [html, setHtml] = useState();
  
    const [contentArray, setContentArray] = useState([])
  
    const arrayToHtml = () => {
      return contentArray.join('');
    };
  
    // Handle changes in the contentEditable
    const handleContentChange = (e) => {
      const updatedHtml = e.target.innerHTML
      // console.log(updatedHtml)
      let taggedEntitiesArray = splitStringByTagsAndChar(updatedHtml)
      let taggedEntityCurrentPosition = 0
      const newContentArray = []
      let totalUpdatedHtmlLength = updatedHtml.length
      let iterator = 0;
      while (!(iterator >= totalUpdatedHtmlLength)) {
        const start = iterator
        if (taggedEntitiesArray.length > 0) {
          const slicedContent = updatedHtml.slice(start, totalUpdatedHtmlLength)
          const currentEntity = taggedEntitiesArray[taggedEntityCurrentPosition]
          let currentEntityLength = currentEntity.length
          let currentRegex = new RegExp(`^${currentEntity}`)
          if (slicedContent.match(currentRegex)) {
            newContentArray.push(currentEntity)
            iterator = iterator + currentEntityLength
          }
          else {
            newContentArray.push(updatedHtml[start])
            iterator++
          }
        }
        else {
          newContentArray.push(updatedHtml[start])
          iterator++
        }
      }
      console.log(newContentArray)
      setContentArray(() => [...newContentArray])
    };
  
    const squareRoot = (expression) => (
      `
        <math>
          <msqrt>
          <mn>${expression}</mn>
          </msqrt>
        </math>
      `.trim()
    )
  
    const addSquareRoot = (expression) => {
      setContentArray((prevContentArray) => [...prevContentArray, squareRoot(expression)])
    }
    useEffect(() => {
      // Set the caret position to the end when the component mounts and when content changes
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false); // Collapse the range to the end
      selection.removeAllRanges();
      selection.addRange(range);
    }, [html]);
  
    useEffect(() => {
      const html = arrayToHtml(contentArray)
      // if (isHtmlValid(html)) {
      setHtml(html)
      // }
    }, [contentArray])
  
  
    const splitStringByTagsAndChar = (innerHTML) => {
      const tagsRegex = getTagsRegex(supportedTags)
      return innerHTML.match(tagsRegex) || [];
    }
  
    const isHtmlValid = (html) => {
      const tagPattern = /<\/?[a-z][\s\S]*>/i;
      return tagPattern.test(html);
    };
  
  
    const getHtmlString = (htmlEntityString) => {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = htmlEntityString;
      return tempElement.innerText;
    }
    const getTagsRegex = (supportedTags) => {
      const regexArray = getTagRegexArray(supportedTags);
      const orPattern = regexArray.join('|');
      const wholePattern = `${orPattern}`;
      return new RegExp(wholePattern, 'g');
    }
  
    const getTagRegexArray = (tags) => {
      const regexArray = tags.map((tag) => {
        return `<${tag}>.*?<\/${tag}>`; // Use non-greedy .*? to match tag contents
      });
      return regexArray;
    }
  
  
  
  
    return (
      <div>
        <button onClick={() => addSquareRoot(16)}>Add Root</button>
        <div
          style={{ border: "1px solid black", padding: "5px" }}
          ref={contentRef}
          contentEditable={true}
          onInput={handleContentChange}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
  

const Concept = () => {
  return (
    <div>
        <ContentEditableWithArray/>
    </div>
  )
}

export default Concept
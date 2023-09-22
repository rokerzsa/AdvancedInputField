import React, { useState, useRef } from 'react';
import { InlineMath } from 'react-katex';
import { addStyles, EditableMathField } from 'react-mathquill';

// Inserts the required CSS to the <head> block.
// You can skip this if you want to do that by yourself.
addStyles();



const mathQuillLatexButton = [
  {
    title: "π",
    latex: "\\pi",
  },
  {
    title: "-",
    latex: "-"
  },
  {
    title: "×",
    latex: "×"
  },
  {
    title: "÷",
    latex: "\\div"
  },
  {
    title: "•",
    latex: "•"
  },
  {
    title: "=",
    latex: "="
  },
  {
    title: "(",
    latex: "("
  },
  {
    title: ")",
    latex: ")"
  },
  {
    title: "{",
    latex: "{"
  },
  {
    title: "}",
    latex: "}"
  },
  {
    title: "[",
    latex: "["
  },

  {
    title: "]",
    latex: "]"
  },

]

const fractionButtons = [
  {
    title: "\\frac{▯}{▯}",
    latex: "\\frac{}{}",
  },
  {
    title: "▯^▯",
    latex: "^2",
  }
  ,
  {
    title: "▯_▯",
    latex: "_2",
  },
  {
    title: "\\sqrt{[]}",
    latex: "\\sqrt{}",
  },
  {
    title: "\\sqrt[▯]{▯}",
    latex: "\\sqrt[]{}",
  },
  {
    title: "|▯|",
    latex: "|{}|",
  }
]
const EditableMathInputField = ({ latex, setLatex }) => {
  const mathFieldRef = useRef(null);
  const addCommand = (latex) => {
    if (mathFieldRef.current) {
      const mathField = mathFieldRef.current;
      mathField.write(latex)
    }
  };

  return (
    <div>
      <EditableMathField
        latex={latex}
        style={{ width: "98.5%", height: "100%", fontSize: 28, padding:"5px" }}
        onChange={(mathField) => {
          setLatex(mathField.latex());
        }}
        mathquillDidMount={(mathField) => {
          // Assign the ref to the EditableMathField component
          mathFieldRef.current = mathField;
        }}
      />
      <div>
        {
          mathQuillLatexButton.map((buttonDetail, buttonIndex) => {
            const { title, latex } = buttonDetail
            return (
              <AddEquationButton key={latex} title={title} latex={latex} addCommand={addCommand} />
            )
          })
        }
        </div>
        <div>
        {
          fractionButtons.map((buttonDetail, buttonIndex) => {
            const { title, latex } = buttonDetail
            return (
              <AddEquationButton key={latex} title={<InlineMath math={title}/>} latex={latex} addCommand={addCommand} />
            )
          })
        }
      </div>
    </div>
  );
};

export default EditableMathInputField;

const AddEquationButton = ({ title, latex, addCommand }) => {
  return (
    <button style={{ margin: "5px 10px", fontSize: 24, padding: "5px 15px" }} onClick={() => addCommand(latex)}>
      {title}
    </button>
  )
}

import React, { useState, useRef } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';

// Inserts the required CSS to the <head> block.
// You can skip this if you want to do that by yourself.
addStyles();

const EditableMathInputField = ({latex, setLatex}) => {
  const mathFieldRef = useRef(null);
  const addFraction = () => {
    if (mathFieldRef.current) {
      const mathField = mathFieldRef.current;
      mathField.cmd( '\\frac' )
    }
  };

  return (
    <div>
      <button onClick={addFraction}>Add frac</button>
      <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex());
        }}
        mathquillDidMount={(mathField) => {
          // Assign the ref to the EditableMathField component
          mathFieldRef.current = mathField;
        }}
      />
    </div>
  );
};

export default EditableMathInputField;

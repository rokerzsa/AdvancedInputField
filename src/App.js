import React, { useState } from 'react';
import CustomBlock from './CustomBlockEditor';
import CustomBlockEditor from './CustomBlockEditor';
import TeXEditorExample from './components/TeXEditorExample';
import EditableMathInputField from './components/EditableMathInputField';
import StyledInputWithMath from './components/StyledInputWithMath';
import ReactQuillExample from './ReactQuillExample';

export default function App() {
  const [latex, setLatex] = useState("")

  return (
    <div>
      <EditableMathInputField latex={latex} setLatex={setLatex}/>
      <StyledInputWithMath latex={latex} />

      {/* <MyEditor/> */}
      {/* <Editor/> */}
      <br/><br/><br/><br/>
      <TeXEditorExample />
      <ReactQuillExample/>
    </div>
  );
}

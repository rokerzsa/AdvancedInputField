import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [theme, setTheme] = useState("snow");
  const placeholder = "Write something...";
  const quillRef = useRef(null); // Reference to the Quill instance

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === "core") newTheme = null;
    setTheme(newTheme);
  };

  // Function to handle the custom button click
  const handleCustomButtonClick = () => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    const format = "custom-block";

    if (range) {
      quill.format(format, true); // Toggle the block format
    }
  };

  return (
    <div>
      <ReactQuill
        theme={theme}
        onChange={handleChange}
        value={editorHtml}
        ref={quillRef}
        modules={{
          toolbar: {
            container: [
              [{ customButton: "Custom Block" }], // Add your custom button
              ["bold", "italic", "underline", "strike"],
            ],
            handlers: {
              customButton: handleCustomButtonClick, // Handle the custom button click
            },
          },
        }}
        formats={[
          // Define your custom block format
          "custom-block",
          "bold",
          "italic",
          "underline",
          "strike",
        ]}
        bounds={".app"}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Editor;

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, "bold", "italic", "underline"]],
  };

function ReactQuillExample() {
  const [htmlContent, setHtmlContent] = useState("");

  return (
    <div>
      <ReactQuill
      modules={toolbarModules}
      formats={["bold","italic"]}
        value={htmlContent}
        onChange={(value) => setHtmlContent(value)}
      />
      <div
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="rendered-html"
      />
    </div>
  );
}

export default ReactQuillExample;

import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

function OutputSection({ aiOutput }) {
  const editorRef = useRef();
 
  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput)
  }, [aiOutput])

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text:", err));
  };

  return (
    <div className="shadow-lg border rounded-md bg-secondary">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-large">Your Result</h2>
        <Button onClick={()=>handleCopy(aiOutput)} className="flex gap-2">
          <Copy /> Copy
        </Button>
      </div>
      <Editor
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="600px"
        ref={editorRef}
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
}

export default OutputSection;

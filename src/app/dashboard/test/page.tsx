"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default function View() {
  const [content, setContent] = useState("");

  const delta = {
    ops: [
      { insert: "Hello World! \n" },
      { attributes: { bold: true }, insert: "This text is bold!" },
      { insert: "\n" },
      { attributes: { italic: true }, insert: "This text is italic!" },
      { insert: "\n" },
      {
        attributes: { link: "https://www.google.com" },
        insert: "This text is a link to Google!",
      },
    ],
  };

  useEffect(() => {
    var converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    var html = converter.convert();
    setContent(html);
  }, [delta]);

  return (
    <div>
      <div
        className="text-black"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="text-black">{content}</div>
    </div>
  );
}

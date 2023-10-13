import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, Link } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

import { Image as Img } from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

export default function TextEditor({content, placeholder}: {content: string, placeholder?: string}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "text-black",
          },
        },
      }),
      Underline,
      Link,
      Highlight,
      Table.configure({
        HTMLAttributes: {
          style:
            "padding: 1.5rem; border-radius: 0.5rem; border-width: 2px;	border-color: rgb(243 244 246);",
        },
        resizable: true,
      }),
      TableRow.configure({
        HTMLAttributes: {
          style: "border-width: 2px;	border-color: rgb(243 244 246);",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          style: "border-width: 2px;	border-color: rgb(243 244 246);",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          style: "border-width: 2px;	border-color: rgb(243 244 246);",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    content: content,
  });

  editor?.commands.setContent(content);

  return (
    <RichTextEditor editor={editor}>
                <RichTextEditor.Toolbar sticky>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <Menu placement="right-start">
                      <MenuHandler>
                        <button className="container p-1 h-[1.625rem] w-[1.625rem] bg-white ring-1 ring-gray-300 rounded-md">
                          <img
                            width="50"
                            height="50"
                            src="https://img.icons8.com/ios/50/table-1.png"
                            alt="table-1"
                          />
                        </button>
                      </MenuHandler>
                      <MenuList className="z-[9999]">
                        <MenuItem
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .insertTable({
                                rows: 3,
                                cols: 3,
                                withHeaderRow: true,
                              })
                              .run()
                          }
                        >
                          Añadir tabla
                        </MenuItem>
                        <hr className="my-2" />
                        <MenuItem
                          onClick={() =>
                            editor?.chain().focus().addColumnBefore().run()
                          }
                        >
                          Añadir columna antes
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor?.chain().focus().addColumnAfter().run()
                          }
                        >
                          Añadir columna despues
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor?.chain().focus().addRowBefore().run()
                          }
                        >
                          Añadir fila antes
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor?.chain().focus().addRowAfter().run()
                          }
                        >
                          Añadir fila despues
                        </MenuItem>
                        <hr className="my-2" />
                        <MenuItem
                          onClick={() =>
                            editor?.chain().focus().deleteColumn().run()
                          }
                        >
                          Borrar columna
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor?.chain().focus().deleteRow().run()
                          }
                        >
                          Borrar fila
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor?.chain().focus().deleteTable().run()
                          }
                        >
                          Borrar tabla
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content />
              </RichTextEditor>
  )
}

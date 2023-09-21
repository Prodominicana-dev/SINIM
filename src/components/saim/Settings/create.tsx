"use client";
import { format, set } from "date-fns";
import { es } from "date-fns/locale";
import { useRef, useState } from "react";
import { useEditor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@mantine/tiptap';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import Image from 'next/image';


import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";


export default function SAIM() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const openRef = useRef<() => void>(null);

  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current(); // solo se llama si openRef.current no es null
    }
  };

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const isHovering = files.length > 0 ? 'group-hover:bg-black/30' : 'text-black border-black group-hover:border-black/70 group-hover:text-black/70 duration-300';

  const editor1 = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList:{
          HTMLAttributes: {
            class: 'text-black'
          }
        }
      }),
      Underline,
      Link,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder: 'Contenido del SAIM' })
    ],
    content: '',
  });

  const theme = useMantineTheme();


  const categories = ['Oportunidades', 'Actualizaciones', 'Amenazas', 'Obstáculos'] 
  const [category, onChange] = useState(categories[0]);
  console.log(editor1?.getHTML());
  return (
    <div className="flex justify-center h-[40rem]">
      <div className="w-10/12 sm:w-8/12">
        <div className="w-full text-base text-black">
        <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center h-5 p-0 hover:bg-transparent "
            ripple={false}
          >
            {category}
          </Button>
        </MenuHandler>
          <MenuList className="w-40">
            {categories.map((category) => (
              <MenuItem
                key={category}
                onClick={() => onChange(category)}
              >
                {category}
              </MenuItem>
            ))
            }
          </MenuList>
        </Menu>
        </div>
        <input className="w-full my-2 text-xl font-bold text-black placeholder-black sm:text-3xl" placeholder="Título" />
        <div className="text-xs font-light text-neutral-500">
          {format(Date.now(), "dd MMMM yyyy", { locale: es })}
        </div>
        

        <div className=" relative w-full h-[32rem] group my-5">
          <div className="absolute inset-0 z-0 cursor-pointer " onClick={handleClickSelectFile} >
            {/* ImagePreview */}
            {(files.length > 0) ? 
              <div className="flex justify-center w-full h-full">
                <Image
                  src={URL.createObjectURL(files[0])}
                  width={1920}
                  height={1080}
                  alt="card-image"
                  className="object-cover h-full duration-500 rounded-md group-hover:blur-sm"
                />
              </div> : <div className="flex justify-center w-full h-full border-2 border-black border-dashed rounded-xl"></div>
            }
          </div>
          <div className="flex items-center justify-center w-full h-full text-base text-black">
            <Dropzone
                openRef={openRef}
                onDrop={handleDrop}
                activateOnClick={false}
                accept={IMAGE_MIME_TYPE}
                maxFiles={1}
                maxSize={10 * 1024 * 1024}
                styles={{ inner: { pointerEvents: 'all' } }}
                className="w-full bg-transparent border-0 group-hover:bg-transparent"
              > 
                <Group justify="center">
                  <Button onClick={handleClickSelectFile} className={`${isHovering} bg-transparent border-[1px] hover:shadow-none `}>Subir imagen</Button>
                </Group>
              </Dropzone>
          </div>
        </div>

        <div className="pb-10 text-lg text-black">
          
          <RichTextEditor editor={editor1}>
          <RichTextEditor.Toolbar sticky>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
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
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
        </div>
       
      </div>
    </div>
  );
}
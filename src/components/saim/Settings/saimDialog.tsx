"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import React, { useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Saim from "@/src/models/saim";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, Link } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { Group, Text } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import Select from "react-select";
import makeAnimated from "react-select/animated";
<<<<<<< Updated upstream
import {Image as Img} from '@tiptap/extension-image'
=======
import { Image as Img } from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

>>>>>>> Stashed changes
import { useAtom } from "jotai";
import { countrySelect, productSelect, saimAtom } from "@/src/state/states";

const animatedComponents = makeAnimated();

export default function SaimDialog({
  saim,
  open,
  handleOpen,
  updateSaims,
}: {
  saim?: Saim;
  open: boolean;
  handleOpen: () => void;
  updateSaims: () => void;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [description] = useState<any>("");
  const [title, setTitle] = useState("");
  const categories = [
    "Oportunidades",
    "Actualizaciones",
    "Amenazas",
    "Obstáculos",
  ];
  const [category, onChange] = useState(categories[0]);
  const [countries] = useAtom(countrySelect);
  const [products] = useAtom(productSelect);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [tableMenuOpen, setTableMenuOpen] = useState(false);

  const openRef = useRef<() => void>(null);
  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current(); // solo se llama si openRef.current no es null
    }
  };

  const tableHTML = `
  <table ">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`;

  const editor1 = useEditor({
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
        placeholder: "Contenido de la Alerta Comercial",
      }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],

    content: saim?.description,
  });

  useEffect(() => {
    if (saim) {
      editor1?.commands.insertContent(saim.description);
      setTitle(saim.title);
      onChange(saim.category);
      const saimCountries = saim.countries?.map((country: any) => {
        return { value: country, label: country.name };
      });
      setSelectedCountries(saimCountries);
      const saimProducts = saim.products?.map((product: any) => {
        const val = {
          name: product.name,
          code: product.code,
        };
        return { value: val, label: `${product.name} - ${product.code}` };
      });
      setSelectedProducts(saimProducts);
    }
  }, [saim]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };
  const isHovering =
    files.length > 0
      ? "group-hover:bg-black/30"
      : "text-black border-black group-hover:border-black/70 group-hover:text-black/70 duration-300";

  const handleSubmit = async () => {
    const products = selectedProducts.map((product: any) => {
      return product.value;
    });
    const countries = selectedCountries.map((country: any) => {
      return country.value;
    });
    const data = new FormData();
    data.append("title", title);
    data.append(
      "description",
      editor1?.getHTML() !== undefined ? editor1?.getHTML() : ""
    );
    data.append("category", category);
    data.append("countries", JSON.stringify(countries));
    data.append("products", JSON.stringify(products));
    if (files.length > 0) {
      data.append("file", files[0]);
    }
    if (!saim) {
      return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/saim`, data)
        .then((res) => {
          if (res.status === 200) {
            notifications.show({
              id: "saim",
              autoClose: 5000,
              withCloseButton: false,
              title: "Alerta Comercial creada",
              message: "La Alerta Comercial ha sido creada correctamente.",
              color: "green",
              loading: false,
            });
            handleOpen();
            setFiles([]);
            editor1?.commands.clearContent();
            setTitle("");
            setSelectedCountries([]);
            setSelectedProducts([]);
            updateSaims();
          }
          notifications.show({
            id: "saim",
            autoClose: 5000,
            withCloseButton: false,
            title: "Error",
            message: "La Alerta Comercial no se ha creado correctamente.",
            color: "green",
            loading: false,
          });
        });
    }
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/saim/${saim.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          notifications.show({
            id: "saim",
            autoClose: 5000,
            withCloseButton: false,
            title: "Alerta Comercial editado",
            message: "La Alerta Comercial ha sido modificada correctamente.",
            color: "green",
            loading: false,
          });
          handleOpen();
          setFiles([]);
          editor1?.commands.clearContent();
          setTitle("");
          setSelectedCountries([]);
          setSelectedProducts([]);
          // Editar el SAIM editado en el estado
          updateSaims();
        }
        notifications.show({
          id: "saim",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error editando la Alerta Comercial.",
          color: "green",
          loading: false,
        });
      });
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="flex flex-col h-screen overflow-scroll"
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => {
            if (!saim) {
              setFiles([]);
              editor1?.commands.clearContent();
              setTitle("");
              setSelectedCountries([]);
              setSelectedProducts([]);
            }
            handleOpen();
          }}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>

      <DialogBody className=" justify-center h-[100vh] overflow-y-auto">
        <div className="flex justify-center ">
          <div className="w-full sm:w-8/12">
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
                <MenuList className="w-40 z-[9999]">
                  {categories.map((category) => (
                    <MenuItem key={category} onClick={() => onChange(category)}>
                      {category}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </div>

            <input
              className="w-full my-2 text-xl font-bold text-black placeholder-black resize-none sm:text-3xl"
              placeholder="Título"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={saim ? title : ""}
            />
            <div className="text-xs font-light text-neutral-500">
              {format(Date.now(), "dd MMMM yyyy", { locale: es })}
            </div>

            <div className=" relative w-full h-[32rem] group my-5">
              <div
                className="absolute inset-0 z-0 cursor-pointer "
                onClick={handleClickSelectFile}
              >
                {/* ImagePreview */}
                {files.length > 0 ? (
                  <div className="flex justify-center w-full h-full">
                    <Image
                      src={URL.createObjectURL(files[0])}
                      width={1920}
                      height={1080}
                      alt="card-image"
                      className="object-cover h-full duration-500 rounded-md group-hover:blur-sm"
                    />
                  </div>
                ) : saim ? (
                  <div className="flex justify-center w-full h-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/data/saim/${saim?.id}/img/${saim?.image}`}
                      width={1920}
                      height={1080}
                      alt="saim-image"
                      className="object-cover h-full duration-500 rounded-md group-hover:blur-sm"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center w-full h-full border-2 border-black border-dashed rounded-xl"></div>
                )}
              </div>

              <div className="flex items-center justify-center w-full h-full text-base text-black">
                <Dropzone
                  openRef={openRef}
                  onDrop={handleDrop}
                  onReject={(e) => {
                    notifications.show({
                      id: "saim",
                      autoClose: 5000,
                      withCloseButton: false,
                      title: "¿Estás loco o qué?",
                      message: "La imagen no puede pasar de 5MB.",
                      color: "red",
                      loading: false,
                    });
                  }}
                  activateOnClick={false}
                  accept={IMAGE_MIME_TYPE}
                  maxFiles={1}
                  multiple={false}
                  maxSize={5 * 1024 * 1024}
                  styles={{ inner: { pointerEvents: "all" } }}
                  className="w-full bg-transparent border-0 group-hover:bg-transparent"
                >
                  <Group justify="center">
                    <Button
                      onClick={handleClickSelectFile}
                      className={`${isHovering} bg-transparent border-[1px] hover:shadow-none `}
                    >
                      Subir imagen
                    </Button>
                    <div className="text-black">{description}</div>
                  </Group>
                </Dropzone>
              </div>
            </div>

<<<<<<< Updated upstream
            <div className="text-lg font-normal text-black">
            <div className="text-lg font-bold text-black">
=======
            <div className="text-lg text-black ">
              <div className="text-lg font-bold text-black">
>>>>>>> Stashed changes
                Contenido de la Alerta Comercial
              </div>
              <RichTextEditor editor={editor1}>
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
                            editor1
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
                            editor1?.chain().focus().addColumnBefore().run()
                          }
                        >
                          Añadir columna antes
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor1?.chain().focus().addColumnAfter().run()
                          }
                        >
                          Añadir columna despues
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor1?.chain().focus().addRowBefore().run()
                          }
                        >
                          Añadir fila antes
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor1?.chain().focus().addRowAfter().run()
                          }
                        >
                          Añadir fila despues
                        </MenuItem>
                        <hr className="my-2" />
                        <MenuItem
                          onClick={() =>
                            editor1?.chain().focus().deleteColumn().run()
                          }
                        >
                          Borrar columna
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor1?.chain().focus().deleteRow().run()
                          }
                        >
                          Borrar fila
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            editor1?.chain().focus().deleteTable().run()
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
            </div>

            <div className="w-full my-5">
              <div className="text-lg font-bold text-black">
                Seleccione los países de la Alerta Comercial
              </div>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione los países de la Alerta Comercial..."
                onChange={(e) => setSelectedCountries(e)}
                defaultValue={selectedCountries}
                options={countries}
              />
            </div>

            <div className="w-full my-5">
              <div className="text-lg font-bold text-black">
                Seleccione los productos de la Alerta Comercial
              </div>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione los productos de la Alerta Comercial..."
                onChange={(e) => setSelectedProducts(e)}
                defaultValue={selectedProducts}
                options={products}
              />
            </div>

            <div className="flex justify-end w-full h-12 my-5">
              <Button
                disabled={
                  !saim
                    ? title === "" ||
                      editor1?.isEmpty ||
                      files.length === 0 ||
                      selectedCountries.length === 0 ||
                      selectedProducts.length === 0
                    : title === "" ||
                      editor1?.isEmpty ||
                      selectedCountries.length === 0 ||
                      selectedProducts.length === 0
                }
                onClick={handleSubmit}
                color="green"
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}

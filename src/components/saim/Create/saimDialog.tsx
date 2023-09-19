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
import React, { useCallback, useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { data } from "autoprefixer";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import getSaim from "@/src/services/saim/useSaim";
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
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { countryAtom } from "@/src/state/countries";
import { productAtom } from "@/src/state/products";

const animatedComponents = makeAnimated();

export default function SaimDialog({
  saim,
  open,
  handleOpen,
}: {
  saim?: Saim;
  open: boolean;
  handleOpen: () => void;
}) {
  const [data, setData] = useState<Saim>();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [description, setDescription] = useState<any>("");
  const [title, setTitle] = useState("");
  const categories = [
    "Oportunidades",
    "Actualizaciones",
    "Amenazas",
    "Obstáculos",
  ];
  const [category, onChange] = useState(categories[0]);
  const [countries, setCountries] = useAtom(countryAtom);
  const [products, setProducts] = useAtom(productAtom);
  const [sCountries, setSCountry] = useState<any>([]);
  const [sProducts, setSProducts] = useState<any>([]);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);

  console.log(countries, products);

  const openRef = useRef<() => void>(null);
  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current(); // solo se llama si openRef.current no es null
    }
  };

  useShallowEffect(() => {
    if (countries.length > 0) {
      const c = countries.map((country: any) => {
        return {
          value: country,
          label: country.name,
        };
      });
      setSCountry(c);
    }

    if (products.length > 0) {
      const p = products.map((product: any) => {
        const val = {
          name: product.name,
          code: product.code,
        };
        return {
          value: val,
          label: `${product.name} - ${product.code}`,
        };
      });
      setSProducts(p);
    }

    if (saim) {
      setTitle(saim.title);
      onChange(saim.category);
      const saimCountries = saim.countries.map((country: any) => {
        return { value: country, label: country.name };
      });
      setSelectedCountries(saimCountries);
      const saimProducts = saim.products.map((product: any) => {
        const val = {
          name: product.name,
          code: product.code,
        };
        return { value: val, label: `${product.name} - ${product.code}` };
      });
      setSelectedProducts(saimProducts);
    }
  }, []);

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
    console.log(data.values);
    if (!saim) {
      return await axios
        .post("http://localhost:3001/saim", data)
        .then((res) => {
          if (res.status === 200) {
            notifications.show({
              id: "saim",
              autoClose: 5000,
              withCloseButton: false,
              title: "SAIM creado",
              message: "El SAIM se ha creado correctamente.",
              color: "green",
              loading: false,
            });
            handleOpen();
            setFiles([]);
            editor1?.commands.clearContent();
            setTitle("");
            setSelectedCountries([]);
            setSelectedProducts([]);
          }
          notifications.show({
            id: "saim",
            autoClose: 5000,
            withCloseButton: false,
            title: "Error",
            message: "El SAIM no se ha creado correctamente.",
            color: "green",
            loading: false,
          });
        });
    }

    await axios
      .put(`http://localhost:3001/saim/${saim.id}`, data)
      .then((res) => {
        if (res.status === 200) {
          notifications.show({
            id: "saim",
            autoClose: 5000,
            withCloseButton: false,
            title: "SAIM editado",
            message: "El SAIM ha sido modificado correctamente.",
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
        }
        notifications.show({
          id: "saim",
          autoClose: 5000,
          withCloseButton: false,
          title: "Error",
          message: "Hubo un error editando el SAIM.",
          color: "green",
          loading: false,
        });
      });
  };

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
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Contenido del SAIM" }),
    ],
    content: saim?.description,
  });

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="h-screen flex flex-col overflow-scroll"
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
          <XMarkIcon className="w-7 m-2" />
        </IconButton>
      </DialogHeader>

      <DialogBody className=" justify-center h-[100vh] overflow-y-auto">
        <div className="flex justify-center  ">
          <div className="w-full sm:w-8/12">
            <div className="text-base text-black w-full">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    variant="text"
                    className="flex h-5 hover:bg-transparent  items-center p-0 "
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
              className="text-xl sm:text-3xl text-black font-bold my-2 placeholder-black w-full"
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
                {files.length > 0 || saim ? (
                  <div className="flex w-full h-full justify-center">
                    <Image
                      src={
                        !saim
                          ? URL.createObjectURL(files[0])
                          : `http://127.0.0.1:3001/data/saim/${saim?.id}/img/${saim?.image}`
                      }
                      width={1920}
                      height={1080}
                      alt="card-image"
                      className="object-cover h-full rounded-md group-hover:blur-sm duration-500"
                    />
                  </div>
                ) : (
                  <div className="flex w-full h-full justify-center border-2 border-dashed border-black rounded-xl"></div>
                )}
              </div>

              <div className="text-base flex justify-center items-center text-black w-full h-full">
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
                  className="bg-transparent w-full border-0 group-hover:bg-transparent"
                >
                  <Group position="center">
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

            <div className=" text-black text-lg">
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

            <div className="w-full my-5">
              <div className="text-black font-bold text-lg">
                Seleccione los países del SAIM
              </div>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione los países del SAIM..."
                onChange={(e) => setSelectedCountries(e)}
                defaultValue={selectedCountries}
                options={sCountries}
              />
            </div>

            <div className="w-full my-5">
              <div className="text-black font-bold text-lg">
                Seleccione los productos del SAIM
              </div>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Seleccione los productos del SAIM..."
                onChange={(e) => setSelectedProducts(e)}
                defaultValue={selectedProducts}
                options={sProducts}
              />
            </div>

            <div className="w-full my-5 h-12 flex justify-end">
              <Button
                disabled={
                  title === "" ||
                  editor1?.isEmpty ||
                  files.length === 0 ||
                  countries.length === 0 ||
                  products.length === 0
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
function async(id: number | undefined) {
  throw new Error("Function not implemented.");
}

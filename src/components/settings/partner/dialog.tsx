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
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Saim from "@/src/models/saim";
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";
import { Group } from "@mantine/core";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function PartnerDialog({
  source,
  open,
  handleOpen,
  update,
}: {
  source?: any;
  open: boolean;
  handleOpen: () => void;
  update: () => void;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [description, setDescription] = useState<any>("");
  const [url, setUrl] = useState<any>("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<any>();
  const [categories] = useState<any[]>([{label: "Nacional", value: "nacional"}, {label: "Internacional", value: "internacional"}]);

  const openRef = useRef<() => void>(null);
  const handleClickSelectFile = () => {
    if (openRef.current) {
      openRef.current(); // solo se llama si openRef.current no es null
    }
  };

  useEffect(() => {
    if(source){
      setTitle(source.title);
      setCategory({label: source.type === "nacional" ? "Nacional" : "Internacional", value: source.type});
      setDescription(source.description);
      setUrl(source.url);
    }
  }, [source]);

  const handleDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };
  const isHovering =
    files.length > 0
      ? "group-hover:bg-black/30"
      : "text-black border-black group-hover:border-black/70 group-hover:text-black/70 duration-300";

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", title);
    data.append("type", category.value);
    data.append("description", description);
    data.append("url", url);
    if (files.length > 0) {
      data.append("file", files[0]);
    }

    console.log(data)
    
      return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/partner`, data)
        .then((res) => {
          if (res.status === 200) {
            notifications.show({
              id: "partner",
              autoClose: 5000,
              withCloseButton: false,
              title: "Fuente de información agregada",
              message: "La fuente de información ha sido creada correctamente.",
              color: "green",
              loading: false,
            });
            handleOpen();
            setFiles([]);
            setTitle("");
            update();
          }
          notifications.show({
            id: "partner",
            autoClose: 5000,
            withCloseButton: false,
            title: "Error",
            message: "La fuente de información no se ha creado correctamente.",
            color: "green",
            loading: false,
          });
        });
  };

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"md"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="flex flex-col sm:h-screen 2xl:h-[90vh] overflow-scroll"
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => {
            setFiles([]);
            setTitle("");
            handleOpen();
          }}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>

      <DialogBody className=" justify-center h-[100vh] overflow-y-auto">
      
        <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-full text-2xl font-bold text-left text-black sm:w-8/12">Agregar fuente externa</div>
          <div className="w-full space-y-4 sm:w-8/12">
            <div className="w-full">
              <Input label="Título" crossOrigin={""} value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row">
              <div className="w-full sm:w-6/12">
              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                isMulti={false}
                placeholder="Categoría..."
                onChange={(e) => setCategory(e)}
                value={category}
                options={categories}
              />
              </div>
            <div className="w-full sm:w-6/12">
            <Input label="Enlace" crossOrigin={""} value={url} onChange={(e) => setUrl(e.target.value)}/>
            </div>
              
            </div>
            <div className="w-full">
              <Textarea label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="relative w-full my-5 h-80 group">
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
                ) : source ? 
                  (
                    <div className="flex justify-center w-full h-full">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/data/partner/${source?.id}/img/${source?.image}`}
                        width={1920}
                        height={1080}
                        alt="saim-image"
                        className="object-cover h-full duration-500 rounded-md group-hover:blur-sm"
                      />
                    </div>
                  )
                 : (<div className="flex justify-center w-full h-full border-2 border-black border-dashed rounded-xl"></div>)}
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
                  </Group>
                </Dropzone>
              </div>
            </div>

            <div className="flex justify-end w-full h-12 my-5 space-x-3">
              <Button
                disabled={
                  source ?
                      title === "" ||
                      category === undefined ||
                      description === "" ||
                      url === "" ||
                      files.length === 0 
                      :
                      title === "" ||
                      category === undefined ||
                      description === "" ||
                      url === ""
                }
                onClick={() => handleSubmit()}
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

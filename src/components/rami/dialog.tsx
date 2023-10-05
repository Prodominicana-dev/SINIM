"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  IconButton,
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React, { useEffect, useState, useRef } from "react";
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RichTextEditor, Link } from "@mantine/tiptap";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {Image as Img} from '@tiptap/extension-image'
import { useAtom } from "jotai";
import {
  countrySelect,
  productSelect,
  saimAtom,
} from "@/src/state/states";
import TextEditor from "../settings/rami/rich-editor";
import useRami from "@/src/services/ramis/useRami";

const animatedComponents = makeAnimated();

export default function RamiDialog({
  rami,
  open,
  handleOpen,
  updateRami,
  title
}: {
  rami?: any;
  open: boolean;
  handleOpen: () => void;
  updateRami: () => void;
  title: string;
}) {
  const [countries,] = useAtom(countrySelect);
  const [products,] = useAtom(productSelect);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const { data, isLoading, isError } = useRami(rami.id);
  const [ramiData, setRamiData] = useState<any>([]);

  const outputReq = useEditor({
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
      Placeholder.configure({ placeholder: "Requisitos de salida..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    content: "",
  });

  const importReq = useEditor({
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
      Placeholder.configure({ placeholder: "Requisitos de importación..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    
    content: "",
  });

  const regTecnicas = useEditor({
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
      Placeholder.configure({ placeholder: "Regulaciones técnicas..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    
    content: "",
  });

  const permCertf = useEditor({
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
      Placeholder.configure({ placeholder: "Permisos y certificaciones..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    
    content: "",
  });

  const etiquetado = useEditor({
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
      Placeholder.configure({ placeholder: "Etiquetado..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    
    content: "",
  });

  const acComerciales = useEditor({
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
      Placeholder.configure({ placeholder: "Acuerdos comerciales..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    
    content: "",
  });

  const impAran = useEditor({
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
      Placeholder.configure({ placeholder: "Impuestos y Aranceles..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    
    content: "",
  });

  const recursos = useEditor({
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
      Placeholder.configure({ placeholder: "Recursos web..." }),
      Img.configure({
        inline: true,
        HTMLAttributes: {
          class: "w-full h-auto",
        },
        allowBase64: true,
      }),
    ],
    
    content: "",
  });

  
  
  
  useEffect(() => {
    if (rami && !isLoading) {
    
      const ramiCountry = countries.find(
        (country: any) => country.value.id === data.country.id
      );
     
      setSelectedCountries(ramiCountry);
      const ramiProduct = products.find(
        (product: any) => product.value.id === data.product.id
      );
      setSelectedProducts(ramiProduct);
        outputReq?.commands.setContent(data.outputRequirement);
      importReq?.commands.setContent(data.importRequirement);
      regTecnicas?.commands.setContent(data.technicalRequirements);
      permCertf?.commands.setContent(data.permitsCertifications);
      etiquetado?.commands.setContent(data.labelingCertifications);
      acComerciales?.commands.setContent(data.tradeAgreement);
      impAran?.commands.setContent(data.tariffsImposed);
      recursos?.commands.setContent(data.webResource);
    if (!isLoading) {
        const ramidata = [
          {
            label: "Requerimientos salida",
            value: "salida",
            editor: outputReq,
          },
          {
            label: "Requisitos importacion",
            value: "importacion",
            editor: importReq,
          },
          {
            label: "Regulaciones tecnicas",
            value: "regulaciones",
            editor: regTecnicas,
          },
          {
            label: "Permisos y certificaciones",
            value: "certificaciones",
            editor: permCertf,
          },
          {
            label: "Etiquetado",
            value: "etiquetado",
            editor: etiquetado,
          },
          {
            label: "Acuerdos comerciales",
            value: "acuerdos",
            editor: acComerciales,
          },
          {
            label: "Impuestos y aranceles",
            value: "aranceles",
            editor: impAran,
          },
          {
            label: "Recursos web",
            value: "recursosweb",
            editor: recursos,
          },
        ];
        setRamiData(ramidata);
      }

    }
  }, [rami, data, isLoading]);


  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="flex flex-col h-screen overflow-scroll "
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={() => {
            handleOpen();
          }}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>

      <DialogBody className=" justify-center h-[100vh] overflow-y-auto font-normal ">
        <div className="flex justify-center ">
          <div className="flex-col w-full space-y-4 sm:w-11/12">
            
            <p className="w-full text-3xl font-bold text-black">{title}</p>

            <div className="flex flex-row w-full space-x-8">
            <div className="w-full">
              <div className="text-lg font-bold text-black">
                Seleccione el país del RAMI
              </div>
              <Select
                
                components={animatedComponents}
                isMulti={false}
                placeholder="Seleccione el país..."
                onChange={(e) => setSelectedCountries(e)}
                value={selectedCountries}
                options={countries}
                className="z-[9999]"
              />
            </div>

            <div className="w-full ">
              <div className="text-lg font-bold text-black">
                Seleccione el producto del RAMI
              </div>
              <Select
               
                components={animatedComponents}
                isMulti={false}
                placeholder="Seleccione el producto..."
                onChange={(e) => setSelectedProducts(e)}
                value={selectedProducts}
                options={products}
                className="z-[9999]"
              />
            </div>
            </div>

            <div className="pt-3 ">
            <div className="hidden sm:block">
                <UnderlineTabs data={ramiData} />
            </div>
            <div className="block sm:hidden">
                {ramiData.map(({ label, value, editor, key }: any) => (
                <div className="p-2" key={key}>
                    <SectionRami title={label} editor={editor} />
                </div>
                ))}
            </div>
            </div>        

            <div className="flex justify-end w-full h-12 my-5">
              <Button
                color="green"
                disabled = { selectedCountries === null || selectedProducts === null || 
                outputReq?.isEmpty || importReq?.isEmpty || regTecnicas?.isEmpty || permCertf?.isEmpty || etiquetado?.isEmpty || acComerciales?.isEmpty || impAran?.isEmpty || recursos?.isEmpty}
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

function UnderlineTabs({ data }: any) {
    const [activeTab, setActiveTab] = useState("salida");
  
    return (
      <Tabs value={activeTab}>
        <TabsHeader
          className="flex flex-wrap justify-center p-0 bg-white rounded-none"
          indicatorProps={{
            className:
              "bg-gradient-to-r from-purple-700 to-sky-500 shadow-none rounded-none w-[80vw] sm:w-[9vw] lg:w-[8vw]",
          }}
        >
          {data.map(({ label, value }: any) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={`${
                activeTab === value ? "text-gray-900 w-full" : "bg-white"
              } py-0 px-0 w-[80vw] sm:w-[9vw] lg:w-[8vw]`}
            >
              <div className="bg-white w-[80vw] sm:w-[9vw] lg:w-[8vw] h-16 grow ml-2 sm:ml-0 sm:mb-0.5 lg:mb-1 flex items-center justify-center  sm:text-[10px] lg:text-sm">
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ label, value, editor }: any) => (
            <TabPanel className="p-0" key={value} value={value}>
              <SectionRami  title={label} editor={editor} />
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    );
  }

function SectionRami({ title, editor }: any) {
    return (
        <div className="text-lg font-normal text-black">
        <p className="text-lg font-bold text-black">
            {title}
          </p>
          <TextEditor editor={editor} />
        </div>
    );
  }

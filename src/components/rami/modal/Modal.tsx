"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
  Tooltip,
} from "@material-tailwind/react";
import { useCallback, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRami } from "@/src/services/ramis/service";
import DownloadPDF from "../downloadPDF";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Modal({ id }: any) {
  const { data, isLoading }: any = useRami(id);
  const [ramiData, setRamiData] = useState<any>([]);
  useEffect(() => {
    if (!isLoading) {
      const ramidata = [
        {
          label: "Requerimientos salida",
          value: "salida",
          desc: data.outputRequirement,
        },
        {
          label: "Requisitos importacion",
          value: "importacion",
          desc: data.importRequirement,
        },
        {
          label: "Regulaciones tecnicas",
          value: "regulaciones",
          desc: data.technicalRequirements,
        },
        {
          label: "Permisos y certificaciones",
          value: "certificaciones",
          desc: data.permitsCertifications,
        },
        {
          label: "Etiquetado",
          value: "etiquetado",
          desc: data.labelingCertifications,
        },
        {
          label: "Acuerdos comerciales",
          value: "acuerdos",
          desc: data.tradeAgreement,
        },
        {
          label: "Impuestos y aranceles",
          value: "aranceles",
          desc: data.tariffsImposed,
        },
        {
          label: "Recursos web",
          value: "recursosweb",
          desc: data.webResource,
        },
      ];
      setRamiData(ramidata);
    }
  }, [data, isLoading]);

  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleOpen = useCallback(() => {
    setOpen(!open);
    router.back();
  }, [router, open]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <Dialog
      open={open}
      handler={handleOpen}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="h-screen overflow-scroll"
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleOpen}
        >
          <XMarkIcon className="m-2 w-7" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex justify-center h-[100vm] overflow-y-auto">
        <div className="w-11/12">
          <div className="flex flex-col items-center justify-between w-full p-5 text-white rounded-lg sm:flex-row sm:h-64 lg:h-96 bg-gradient-to-tr from-purple-700 to-sky-500 sm:rounded-xl lg:rounded-3xl sm:p-8">
            <div className="flex flex-col justify-center h-full w-full leading-normal sm:w-6/12">
              <div className="basis-7/12 flex flex-col justify-end">
                <div className="text-xs sm:text-sm lg:text-lg">Exporta</div>
                <div className="text-2xl lg:text-6xl">{data.product.name}</div>
                <div className="mb-2 text-sm lg:text-lg lg:pt-3 sm:my-0">
                  {data.product.code}
                </div>
              </div>
              <div className="flex flex-col space-y-1 sm:space-y-0 p-2 sm:p-0 sm:flex-row sm:space-x-3 self-end absolute sm:relative sm:self-start sm:pt-5">
                <Tooltip content={"Descargar PDF"}>
                  <DownloadPDF ramiData={ramiData} data={data} />
                </Tooltip>
                <Tooltip content={"Compartir"}>
                  <button className="bg-white/25 hover:bg-white/50 duration-300 shadow-lg p-4 lg:p-5 flex w-5 h-5 lg:w-10 lg:h-10 justify-center items-center rounded-full">
                    <div>
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                    </div>
                  </button>
                </Tooltip>
              </div>
            </div>
            <div className="flex flex-col justify-between w-full p-3 mt-3 rounded-lg bg-white/25 sm:w-5/12 h-52 sm:h-full sm:p-5">
              <div>
                <div className="text-xs lg:text-sm">Destino</div>
                <div className="text-lg lg:text-4xl">{data.country.name}</div>
              </div>
              <Image
                width={1920}
                height={1080}
                alt=""
                priority
                src={`https://flagcdn.com/${data.country.abbreviation}.svg`}
                className="object-cover w-full h-32 rounded-md lg:rounded-lg sm:h-24 lg:h-52"
              />
            </div>
          </div>
          <div className="pt-3">
            <div className="hidden sm:block">
              <UnderlineTabs data={ramiData} />
            </div>
            <div className="block sm:hidden">
              {ramiData.map(({ label, desc, key }: any) => (
                <div className="p-2" key={key}>
                  <SectionRami title={label} desc={desc} />
                </div>
              ))}
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
        {data.map(({ label, value, desc }: any) => (
          <TabPanel key={value} value={value}>
            <SectionRami title={label} desc={desc} />
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

function SectionRami({ title, desc }: any) {
  return (
    <div>
      <div className="inline-block mb-3 text-2xl font-semibold text-transparent bg-gradient-to-r from-purple-700 to-sky-500 bg-clip-text">
        {title}
      </div>
      <div dangerouslySetInnerHTML={{ __html: desc }}></div>
    </div>
  );
}

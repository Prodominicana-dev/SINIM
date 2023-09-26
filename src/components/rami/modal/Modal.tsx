"use client";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  IconButton,
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useCallback, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useRami from "@/src/services/ramis/useRami";
import { data } from "autoprefixer";

export default function Modal({ id }: any) {
  const { data, isLoading, isError } = useRami(id);
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const handleOpen = useCallback(() => {
    setOpen(!open);
    router.back();
  }, [router]);

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
          <div className="flex justify-between items-center w-full h-96 bg-gradient-to-tr from-purple-700 to-sky-500 rounded-3xl p-8 text-white">
            <div className="flex flex-col leading-normal">
              <div>Exporta</div>
              <div className="text-[3vw]">{data.product.name}</div>
              <div className="text-end">{data.product.code}</div>
            </div>
            <div className="flex flex-col justify-between bg-white/25 w-5/12 h-full rounded-lg p-5">
              <div>
                <div>Destino</div>
                <div className="text-3xl">{data.country.name}</div>
              </div>
              <Image
                width={1920}
                height={1080}
                alt=""
                priority
                src={`https://flagcdn.com/${data.country.abbreviation}.svg`}
                className="rounded-lg w-full h-52 object-cover"
              />
            </div>
          </div>
          <div className="pt-3">
            <UnderlineTabs {...data} />
          </div>
          {/* <div
            className="pb-10 text-lg text-black"
            dangerouslySetInnerHTML={{ __html: data.tradeAgreement }}
          ></div> */}
        </div>
      </DialogBody>
    </Dialog>
  );
}

function UnderlineTabs(rami: any) {
  const [activeTab, setActiveTab] = useState("salida");
  const data = [
    {
      label: "Requerimientos salida",
      value: "salida",
      desc: rami.outputRequirement,
    },
    {
      label: "Requisitos importacion",
      value: "importacion",
      desc: rami.importRequirement,
    },
    {
      label: "Regulaciones tecnicas",
      value: "regulaciones",
      desc: rami.technicalRequirements,
    },
    {
      label: "Permisos y certificaciones",
      value: "certificaciones",
      desc: rami.permitsCertifications,
    },
    {
      label: "Etiquetado",
      value: "etiquetado",
      desc: rami.labelingCertifications,
    },
    {
      label: "Acuerdos comerciales",
      value: "acuerdos",
      desc: rami.tradeAgreement,
    },
    {
      label: "Impuestos y aranceles",
      value: "aranceles",
      desc: rami.tariffsImposed,
    },
    {
      label: "Recursos web",
      value: "recursosweb",
      desc: rami.webResource,
    },
  ];
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-white p-0"
        indicatorProps={{
          className:
            "bg-gradient-to-r from-purple-700 to-sky-500 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={`${
              activeTab === value ? "text-gray-900 w-full" : ""
            } py-0 px-0`}
          >
            <div className="bg-white w-[9vw] h-16 grow mb-1 flex items-center justify-center">
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            <div dangerouslySetInnerHTML={{ __html: desc }}></div>
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

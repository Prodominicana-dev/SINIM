"use client";
import {
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useCallback, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useRami from "@/src/services/ramis/useRami";
import { data } from "autoprefixer";

export default function Page({ params }: { params: { id: number } }) {
  const { data, isLoading, isError } = useRami(params.id);
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
  }, [data]);
  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="flex justify-center h-[100vm] overflow-y-auto">
      <div className="w-8/12">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full  sm:h-64 lg:h-96 bg-gradient-to-tr from-purple-700 to-sky-500 rounded-lg sm:rounded-xl lg:rounded-3xl p-5 sm:p-8 text-white">
          <div className="flex flex-col leading-normal w-full sm:w-6/12">
            <div className="text-xs sm:text-sm lg:text-lg">Exporta</div>
            <div className="text-2xl lg:text-6xl">{data.product.name}</div>
            <div className="text-xs lg:text-sm mb-2 sm:my-0 ">
              {data.product.code}
            </div>
          </div>
          <div className="flex flex-col justify-between bg-white/25 w-full sm:w-5/12 h-52 sm:h-full rounded-lg p-3 sm:p-5">
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
              className="rounded-md lg:rounded-lg w-full h-32 sm:h-24 lg:h-52 object-cover"
            />
          </div>
        </div>
        <div className="pt-3">
          <div className="hidden sm:block">
            <UnderlineTabs data={ramiData} />
          </div>
          <div className="block sm:hidden">
            {ramiData.map(({ label, value, desc }: any) => (
              <div className="p-2">
                <SectionRami title={label} desc={desc} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UnderlineTabs({ data }: any) {
  const [activeTab, setActiveTab] = useState("salida");

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none bg-white p-0 flex justify-center flex-wrap"
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
      <div className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-sky-500  inline-block text-transparent bg-clip-text mb-3">
        {title}
      </div>
      <div dangerouslySetInnerHTML={{ __html: desc }}></div>
    </div>
  );
}

"use client";
import {
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import NextImage from "next/image";
import { useRami } from "@/src/services/ramis/service";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

export default function page() {
  const { data, isLoading, isError }: any = useRami(1);
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
  if (isLoading) {
    return <div></div>;
  }

  return (
    // <div className="flex justify-center h-[100vm] overflow-y-auto">
    //   <div className="w-8/12">
    //     <div className="flex flex-col items-center justify-between w-full p-5 text-white rounded-lg sm:flex-row sm:h-64 lg:h-96 bg-gradient-to-tr from-purple-700 to-sky-500 sm:rounded-xl lg:rounded-3xl sm:p-8">
    //       <div className="flex flex-col w-full leading-normal sm:w-6/12">
    //         <div className="text-xs sm:text-sm lg:text-lg">Exporta</div>
    //         <div className="text-2xl lg:text-6xl">{data.product.name}</div>
    //         <div className="mb-2 text-sm lg:text-lg lg:pt-3 sm:my-0">
    //           {data.product.code}
    //         </div>
    //       </div>
    //       <div className="flex flex-col justify-between w-full p-3 rounded-lg bg-white/25 sm:w-5/12 h-52 sm:h-full sm:p-5">
    //         <div>
    //           <div className="text-xs lg:text-sm">Destino</div>
    //           <div className="text-lg lg:text-4xl">{data.country.name}</div>
    //         </div>
    //         <NextImage
    //           width={1920}
    //           height={1080}
    //           alt=""
    //           priority
    //           src={`https://flagcdn.com/${data.country.abbreviation}.svg`}
    //           className="object-cover w-full h-32 rounded-md lg:rounded-lg sm:h-24 lg:h-52"
    //         />
    //       </div>
    //     </div>

    //     <div className="pt-3">
    //       {ramiData.map(({ label, value, desc, key }: any) => (
    //         <div className="p-2" key={key}>
    //           <SectionRami title={label} desc={desc} />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>

    <PDFDocument ramiData={ramiData} data={data} />
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

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

const PDFDocument = ({ ramiData, data }: any) => {
  return (
    <PDFViewer width={1920} height={1080}>
      <Document>
        <Page size="A4">
          <View
            style={tw(
              `flex flex-col items-center justify-between w-full p-5 text-white rounded-lg sm:flex-row sm:h-64 lg:h-96 bg-gradient-to-tr from-purple-700 to-sky-500 sm:rounded-xl lg:rounded-3xl sm:p-8`
            )}
          >
            <View style={tw(`flex flex-col w-full leading-normal sm:w-6/12`)}>
              <Text style={tw(`text-xs sm:text-sm lg:text-lg`)}>Exporta</Text>
              <Text style={tw(`text-2xl lg:text-6xl`)}>
                {data.product.name}
              </Text>
              <Text style={tw(`mb-2 text-sm lg:text-lg lg:pt-3 sm:my-0`)}>
                {data.product.code}
              </Text>
            </View>
            <View
              style={tw(
                `flex flex-col justify-between w-full p-3 rounded-lg bg-white/25 sm:w-5/12 h-52 sm:h-full sm:p-5`
              )}
            >
              <View>
                <Text style={tw(`text-xs lg:text-sm`)}>Destino</Text>
                <Text style={tw(`text-lg lg:text-4xl`)}>
                  {data.country.name}
                </Text>
              </View>
              <Image
                src={`https://flagcdn.com/${data.country.abbreviation}.svg`}
                style={tw(
                  `object-cover w-full h-32 rounded-md lg:rounded-lg sm:h-24 lg:h-52`
                )}
              />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

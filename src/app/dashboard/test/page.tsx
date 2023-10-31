"use client";
import {
  Tabs,
  Tab,
  TabPanel,
  TabsBody,
  TabsHeader,
  Spinner,
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
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import Html from "react-pdf-html";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function page() {
  const { data, isLoading, isError }: any = useRami(1);
  console.log(data);
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
    <div className="bg-navy shadow-lg p-5 flex w-10 h-10 justify-center items-center rounded-full">
      <PDFDownloadLink
        document={<PDFDocument ramiData={ramiData} data={data} />}
        fileName={`Exporta ${data.product.name} a ${data.country.name}`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <Spinner fill="white" className="w-4" />
          ) : (
            <ArrowDownTrayIcon className="w-5 h-5 text-white" />
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

function SectionRami({ title, desc }: any) {
  return (
    <View>
      <Text style={tw("text-2xl font-semibold text-black")}>{title}</Text>
      <Html>{desc}</Html>
    </View>
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
    <Document>
      <Page size="LETTER">
        <View style={tw(`px-10 pt-10`)}>
          <View
            style={tw(
              `flex font-thin items-center justify-between w-full text-white flex-row h-80 bg-purple-600 rounded-3xl p-5`
            )}
          >
            <View style={tw(`flex flex-col w-full leading-normal sm:w-6/12`)}>
              <Text style={tw(`text-lg`)}>Exporta</Text>
              <View>
                <Text style={tw(`text-6xl`)}>{data.product.name}</Text>
              </View>
              <Text style={tw(`text-lg pt-3`)}>{data.product.code}</Text>
            </View>
            <View
              style={tw(
                `flex flex-col justify-between w-full p-3 rounded-lg bg-[rgba(255,255,255,0.25)] sm:w-5/12 h-52 sm:h-full sm:p-5`
              )}
            >
              <View>
                <Text style={tw(`text-xs`)}>Destino</Text>
                <Text style={tw(`text-xl`)}>{data.country.name}</Text>
              </View>
              <Image
                src={`https://flagcdn.com/w1280/${data.country.abbreviation}.png`}
                style={tw(
                  `object-cover w-full h-32 rounded-md lg:rounded-lg sm:h-24 lg:h-52`
                )}
              />
            </View>
          </View>
        </View>
        <View style={tw(`p-10`)}>
          {ramiData.map(({ label, value, desc, key }: any) => (
            <View key={key}>
              <SectionRami title={label} desc={desc} key={key} />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

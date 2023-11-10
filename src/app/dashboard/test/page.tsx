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
import Html from "react-pdf-html";

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
  const html = `<html>
  <body>
    <style>
      .my-heading4 {
        background: darkgreen;
        color: white;
      }
      pre {
        background-color: #eee;
        padding: 10px;
      }
    </style>
    <h1>Heading 1</h1>
    <h2 style="background-color: pink">Heading 2</h2>
    <h3>Heading 3</h3>
    <h4 class="my-heading4">Heading 4</h4>
    <p>
      Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
      <s>strikethrough</s>,
      <strong><u><s><i>and all of the above</i></s></u></strong>
    </p>
    <p>
      <a href="http://google.com">link</a>
    </p>
    <hr />
    <ul>
      <li>Unordered item</li>
      <li>Unordered item</li>
    </ul>
    <ol>
      <li>Ordered item</li>
      <li>Ordered item</li>
    </ol>
    <br /><br /><br /><br /><br />
    Text outside of any tags
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Foo</td>
          <td>Bar</td>
          <td>Foobar</td>
        </tr>
        <tr>
          <td colspan="2">Foo</td>
          <td>Bar</td>
        </tr>
        <tr>
          <td>Some longer thing</td>
          <td>Even more content than before!</td>
          <td>Even more content than before!</td>
        </tr>
      </tbody>
    </table>
    <div style="width: 200px; height: 200px; background: pink"></div>
    <pre>
function myCode() {
  const foo = 'bar';
}
</pre>
  </body>
</html>
`;
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
    <PDFViewer width={1920} height={1080}>
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
    </PDFViewer>
  );
};

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
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useAtom } from "jotai";
import { countrySelect, productSelect, saimAtom } from "@/src/state/states";
import TextEditor from "./rich-editor";
import { useRami } from "@/src/services/ramis/service";

const animatedComponents = makeAnimated();

export default function RamiDialog({
  rami,
  open,
  handleOpen,
  updateRami,
  title,
}: {
  rami?: any;
  open: boolean;
  handleOpen: () => void;
  updateRami: () => void;
  title: string;
}) {
  const [countries] = useAtom(countrySelect);
  const [products] = useAtom(productSelect);
  const [selectedCountries, setSelectedCountries] = useState<any>([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const { data, isLoading, isError } = useRami(rami?.id);
  const [ramiData, setRamiData] = useState<any>([]);
  const [outputRequirement, setOutputRequirement] = useState<any>("");
  const [importRequirement, setImportRequirement] = useState<any>("");
  const [technicalRequirements, setTechnicalRequirements] = useState<any>("");
  const [permitsCertifications, setPermitsCertifications] = useState<any>("");
  const [labelingCertifications, setLabelingCertifications] = useState<any>("");
  const [tradeAgreement, setTradeAgreement] = useState<any>("");
  const [tariffsImposed, setTariffsImposed] = useState<any>("");
  const [webResource, setWebResource] = useState<any>("");

  useEffect(() => {
    setOutputRequirement(data?.outputRequirement);
    setImportRequirement(data?.importRequirement);
    setTechnicalRequirements(data?.technicalRequirements);
    setPermitsCertifications(data?.permitsCertifications);
    setLabelingCertifications(data?.labelingCertifications);
    setTradeAgreement(data?.tradeAgreement);
    setTariffsImposed(data?.tariffsImposed);
    setWebResource(data?.webResource);
  }, [data]);

  useEffect(() => {
    const ramidata = [
      {
        label: "Requerimientos salida",
        value: "salida",
        placeholder: "Requerimientos de salida...",
        content: outputRequirement,
      },
      {
        label: "Requisitos importacion",
        value: "importacion",
        placeholder: "Requisitos de importación...",
        content: importRequirement,
      },
      {
        label: "Regulaciones tecnicas",
        value: "regulaciones",
        placeholder: "Regulaciones técnicas...",
        content: technicalRequirements,
      },
      {
        label: "Permisos y certificaciones",
        value: "certificaciones",
        placeholder: "Permisos y certificaciones...",
        content: permitsCertifications,
      },
      {
        label: "Etiquetado",
        value: "etiquetado",
        placeholder: "Etiquetado...",
        content: labelingCertifications,
      },
      {
        label: "Acuerdos comerciales",
        value: "acuerdos",
        placeholder: "Acuerdos comerciales...",
        content: tradeAgreement,
      },
      {
        label: "Impuestos y aranceles",
        value: "aranceles",
        placeholder: "Impuestos y aranceles...",
        content: tariffsImposed,
      },
      {
        label: "Recursos web",
        value: "recursosweb",
        placeholder: "Recursos web...",
        content: webResource,
      },
    ];
    if (rami && !isLoading) {
      const ramiCountry = countries.find(
        (country: any) => country.value.id === data.country.id
      );

      setSelectedCountries(ramiCountry);
      const ramiProduct = products.find(
        (product: any) => product.value.id === data.product.id
      );
      setSelectedProducts(ramiProduct);
    }

    if (!rami) {
      setOutputRequirement("");
      setImportRequirement("");
      setTechnicalRequirements("");
      setPermitsCertifications("");
      setLabelingCertifications("");
      setTradeAgreement("");
      setTariffsImposed("");
      setWebResource("");
    }
    setRamiData(ramidata);
  }, [
    rami,
    isLoading,
    outputRequirement,
    importRequirement,
    technicalRequirements,
    permitsCertifications,
    labelingCertifications,
    tradeAgreement,
    tariffsImposed,
    webResource,
  ]);

  const handleSubmit = async () => {
    const data = {
      countryId: Number(selectedCountries.value.id),
      productId: Number(selectedProducts.value.id),
      outputRequirement: outputRequirement,
      importRequirement: importRequirement,
      technicalRequirements: technicalRequirements,
      permitsCertifications: permitsCertifications,
      labelingCertifications: labelingCertifications,
      tradeAgreement: tradeAgreement,
      tariffsImposed: tariffsImposed,
      webResource: webResource,
    };

    if (!rami) {
      return await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/rami`, data)
        .then((res) => {
          if (res.status < 300) {
            notifications.show({
              title: "RAMI creado correctamente",
              message: "El RAMI se creó correctamente.",
              color: "teal",
              autoClose: 5000,
            });
            updateRami();
            handleOpen();
          } else {
            notifications.show({
              title: "Error creando el RAMI",
              message: "Ha ocurrido un error, intenta nuevamente.",
              color: "red",
              autoClose: 5000,
            });
          }
        });
    } else {
      return await axios
        .put(`${process.env.NEXT_PUBLIC_API_URL}/rami/${rami.id}`, data)
        .then((res) => {
          console.log(res.data);
          if (res.status === 200) {
            notifications.show({
              title: "RAMI actualizado correctamente",
              message: "El RAMI se actualizó correctamente.",
              color: "teal",
              autoClose: 5000,
            });
            updateRami();
            handleOpen();
          } else {
            notifications.show({
              title: "Error actualizando el RAMI",
              message: "Ha ocurrido un error, intenta nuevamente.",
              color: "red",
              autoClose: 5000,
            });
          }
        });
    }
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
              <div className="w-6/12">
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
                  className="z-[9999] "
                />
              </div>

              <div className="w-6/12">
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
                  className="z-[9999] "
                />
              </div>
            </div>

            <div className="pt-3 ">
              <div className="hidden sm:block">
                <UnderlineTabs data={ramiData} />
              </div>
              <div className="block sm:hidden">
                {ramiData.map(
                  ({ label, value, editor }: any, index: number) => (
                    <div className="p-2" key={index}>
                      <SectionRami title={label} editor={editor} />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-end w-full h-12 my-5">
              <Button
                color="green"
                disabled={
                  selectedCountries === null ||
                  selectedProducts === null ||
                  outputRequirement === "" ||
                  importRequirement === "" ||
                  technicalRequirements === "" ||
                  permitsCertifications === "" ||
                  labelingCertifications === "" ||
                  tradeAgreement === "" ||
                  tariffsImposed === "" ||
                  webResource === ""
                }
                onClick={handleSubmit}
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
        {data.map(({ label, value }: any, index: number) => (
          <Tab
            key={index}
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
        {data.map(
          ({ label, value, placeholder, content }: any, index: number) => (
            <TabPanel className="p-0" key={index} value={value}>
              <SectionRami
                title={label}
                placeholder={placeholder}
                content={content}
              />
            </TabPanel>
          )
        )}
      </TabsBody>
    </Tabs>
  );
}

function SectionRami({ title, placeholder, content }: any) {
  return (
    <div className="text-lg font-normal text-black">
      <p className="text-lg font-bold text-black">{title}</p>
      <TextEditor placeholder={placeholder} content={content} />
    </div>
  );
}

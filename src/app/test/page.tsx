"use client";

import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Card from "@/src/components/landing/saim/card";

export default function page() {
  const movement = (id: string) => {
    const element = document.getElementById(id);
    element!.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <section
        id="sinim-front"
        className="w-full justify-center items-center lg:h-screen  bg-gradient-to-b from-light-blue from-[40%] to-dark-blue flex flex-col sm:pl-5 sm:pt-5 sm:pr-5 pl-3 pt-3 pr-3 space-y-6 sm:space-y-12"
      >
        <div className="flex items-center justify-center w-full md:h-1/6">
          <Image
            src={"/images/logo/sinim.png"}
            alt="logo"
            className="h-16 w-44"
            width={600}
            height={600}
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full space-y-5 md:h-3/6">
          <h1 className="w-10/12 text-3xl font-black text-center text-white sm:w-7/12 lg:text-5xl ">
            Forjando Alianzas Globales, Creando Oportunidades Locales
          </h1>
          <p className="w-10/12 font-normal text-center text-white sm:w-8/12">
            Explora todas nuestras herramientas justo aqui
          </p>
          <button
            onClick={() => movement("sinim")}
            className="h-12 text-white border-2 border-white rounded-md w-44"
          >
            Empezar
          </button>
        </div>
        <div className="w-full h-full bg-gradient-to-tr from-[#764BD6] via-[#378EF3] to-[#37D584] rounded-t-xl sm:w-10/12 pt-2 px-2">
          <div className="bg-white w-full h-full rounded-t-lg"></div>
          {/* Reemplaza la ruta de la imagen en el src */}
        </div>
      </section>

      <section
        id="sinim"
        className="flex flex-col w-full h-full py-10 space-y-5 bg-white sm:space-y-0 sm:h-screen sm:flex-row"
      >
        <div className="flex items-center justify-center w-full h-full sm:w-6/12">
          <Image
            src={"/images/landing/lights.jpg"}
            alt="imagen"
            width={2725}
            height={4096}
            className="object-cover object-center w-11/12 sm:w-8/12 rounded-[2rem] md:h-3/6 lg:h-4/6 xl:h-5/6"
          />
        </div>
        <div className="flex flex-col justify-center w-full h-full sm:w-6/12">
          <div className="w-9/12">
            <div>
              <p className="font-semibold text-purpurita">
                Sistema de Inteligencia de Mercados
              </p>
              <h1 className="text-5xl font-bold text-black">SINIM</h1>
            </div>
            <p className="w-full py-4 font-normal text-gray-400">
              Una plataforma integral que reúne subsistemas especializados en
              comercio internacional e inversión extranjera directa (IED), con
              el objetivo de impulsar las exportaciones y la atracción de IED en
              República Dominicana.
            </p>
            <button
              onClick={() => movement("saim")}
              className="h-12 text-sm font-semibold border-2 rounded-full w-44 border-purpurita text-purpurita"
            >
              Descubre más
            </button>
          </div>
        </div>
      </section>

      <section
        id="saim"
        className="flex flex-col-reverse w-full h-full py-10 bg-white sm:h-screen xl:pl-32 sm:flex-row"
      >
        <div className="flex flex-col items-center justify-center w-full h-full lg:w-6/12 ">
          <div className="w-10/12">
            <div>
              <p className="font-semibold ">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-morado">
                  Herramienta
                </span>
              </p>
              <h1 className="text-5xl font-bold text-black">
                Alertas Comerciales
              </h1>
            </div>
            <p className="w-full py-4 font-normal text-gray-400">
              Brindan a los exportadores información actualizada sobre
              oportunidades emergentes y desafíos en el comercio internacional.
              Impulsa tus exportaciones de manera más inteligente al mantenerte
              al tanto de las tendencias recientes en el mercado global.
            </p>

            <div className="flex items-center justify-center h-12 p-[2px] duration-300 rounded-full w-44 hover:shadow-lg bg-gradient-to-r from-celeste to-morado">
              <Link
                href={"/dashboard/saim"}
                className="flex items-center justify-center w-full h-full text-sm font-semibold duration-300 bg-white rounded-full"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-celeste to-morado">
                  Descubre más
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full h-full lg:space-x-10 lg:w-6/12">
          <div className="flex flex-col items-end justify-center w-full pt-10 space-y-10 lg:w-3/6 h-5/6 lg:h-full">
            <Card icon="Refresh" title="Actualizaciones" />
            <Card icon="Error" title="Amenazas" />
          </div>
          <div className="flex flex-col items-center justify-start w-full pb-10 space-y-10 lg:w-3/6 lg:items-start h-5/6">
            <Card icon="Increase" title="Oportunidades" />
            <Card icon="Roadblock" title="Obstáculos" />
          </div>
        </div>
      </section>

      <section
        id="datamarket"
        className="flex flex-col lg:flex-row w-full lg:h-screen h-[70rem] bg-white lg:space-x-40"
      >
        <div className="w-11/12 sm:w-10/12 lg:w-6/12 h-full flex items-center justify-center">
          <div className="w-full h-full lg:h-5/6 flex flex-col space-y-5 lg:space-y-10">
            <div className="flex flex-row space-x-5 lg:space-x-10 h-3/6">
              <div className="bg-blue-700 rounded-r-2xl w-2/6"></div>
              <div className="bg-blue-700 rounded-2xl w-4/6 h-4/6 self-end"></div>
            </div>
            <div className="flex flex-row h-3/6 space-x-5 lg:space-x-10">
              <div className="flex flex-col w-full h-full space-y-5 lg:space-y-10">
                <div className="bg-blue-700 rounded-r-2xl w-full h-2/6"></div>
                <div className="bg-blue-700 rounded-r-2xl w-full h-4/6"></div>
              </div>
              <div className="bg-blue-700 rounded-2xl w-full h-4/6"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start w-full lg:w-6/12 h-full ">
          <div className="w-9/12">
            <div>
              <p className="font-semibold text-blue-700">Análisis de datos</p>
              <h1 className="text-5xl font-bold text-black">DataMarket</h1>
            </div>
            <p className="w-full py-4 font-normal text-gray-400">
              Analice datos y estadísticas de comercio internacional e inversión
              extranjera directa con Data Market. Conozca las tendencias en
              compras internacionales y las oportunidades para su negocio
              mediante la inteligencia de mercado.
            </p>
            <Link
              href={"/dashboard/datamarket/1"}
              className="flex items-center justify-center h-12 text-sm font-semibold duration-300 border-2 rounded-full w-44 border-blue-700 text-blue-700 hover:shadow-lg"
            >
              <p>Descubre más</p>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="rami"
        className="flex items-center justify-center w-full h-full py-10 bg-white sm:h-screen"
      >
        <div className="flex flex-row w-11/12 h-5/6  lg:w-10/12 p-8 lg:p-16 lg:h-4/6 rounded-2xl bg-gradient-to-r from-dark-blue from-[20%] to-light-blue">
          <div className="flex flex-col justify-center w-full space-y-3 xl:w-8/12">
            <div>
              <p className="font-semibold text-white">Plataforma</p>
              <h1 className="text-3xl font-bold text-white lg:text-5xl">
                Requisitos de Acceso a Mercados Internacionales
              </h1>
            </div>
            <p className="w-full font-normal text-gray-400 ">
              Inicia tus exportaciones explorando la herramienta Requisitos de
              Acceso a Mercados Internacionales (RAMI). Consulta las medidas,
              requisitos y regulaciones establecidas por cada país para admitir
              la entrada y la comercialización de mercancías importadas desde
              República Dominicana.
            </p>
            <Link
              href={"/dashboard/rami"}
              className="flex flex-row items-center h-12 space-x-3 text-sm font-semibold text-white lg:text-base hover:text-lg duration-300 justify-left w-2/12 group"
            >
              <p>Empieza</p>
              <ArrowRightIcon className="w-5 h-5 group-hover:w-6 group-hover:h-6 duration-300" />
            </Link>
          </div>
        </div>
        <div className="absolute hidden h-full xl:block right-20">
          <Image
            src={"/images/landing/mockupRami.png"}
            alt="rami"
            width={1450}
            height={2936}
            className="object-cover object-center w-full h-full p-36 text-end"
          />
        </div>
      </section>
    </div>
  );
}

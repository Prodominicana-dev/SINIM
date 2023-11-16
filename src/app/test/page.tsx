"use client";

import React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function page() {
  const movement = (id: string) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <section
        id="sinim-front"
        className="w-full justify-center items-center h-screen  bg-gradient-to-b from-light-blue from-[40%] to-dark-blue flex flex-col sm:pl-5 sm:pt-5 sm:pr-5 pl-3 pt-3 pr-3 space-y-6 sm:space-y-12"
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
          <h1 className="w-10/12 text-3xl font-black text-center text-white sm:w-7/12 md:text-5xl ">
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
        <div className="w-full h-full bg-white border-t-2 border-l-2 border-r-2 rounded-t-lg sm:w-10/12 ">
          {/* Reemplaza la ruta de la imagen en el src */}
        </div>
      </section>

      <section id="sinim" className="flex flex-row w-full h-screen bg-white">
        <div className="flex items-center justify-center w-6/12 h-full">
          <Image
            src={"/images/landing/lights.jpg"}
            alt="imagen"
            width={2725}
            height={4096}
            className="object-cover object-center w-8/12 rounded-[2rem] h-5/6"
          />
        </div>
        <div className="flex flex-col justify-center w-6/12 h-full ">
          <div className="w-9/12">
            <div>
              <p className="font-semibold text-purple">
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
              className="h-12 text-sm font-semibold border-2 rounded-full w-44 border-purple text-purple"
            >
              Descubre más
            </button>
          </div>
        </div>
      </section>

      <section
        id="saim"
        className="flex flex-row w-full h-screen pl-32 bg-white"
      >
        <div className="flex flex-col justify-center w-6/12 h-full ">
          <div className="w-10/12">
            <div>
              <p className="font-semibold text-purple">Herramienta</p>
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

            <Link
              href={"/dashboard/saim"}
              className="flex items-center justify-center h-12 text-sm font-semibold duration-300 border-2 rounded-full w-44 border-purple text-purple hover:shadow-lg"
            >
              <p>Descubre más</p>
            </Link>
          </div>
        </div>
        <div className="w-6/12 h-full"></div>
      </section>

      <section
        id="datamarket"
        className="flex flex-row w-full h-screen bg-white"
      >
        <div className="w-6/12 h-full"></div>
        <div className="flex flex-col justify-center w-6/12 h-full ">
          <div className="w-9/12">
            <div>
              <p className="font-semibold text-purple">Análisis de datos</p>
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
              className="flex items-center justify-center h-12 text-sm font-semibold duration-300 border-2 rounded-full w-44 border-purple text-purple hover:shadow-lg"
            >
              <p>Descubre más</p>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="rami"
        className="flex items-center justify-center w-full h-screen bg-white"
      >
        <div className="flex flex-row  w-10/12 p-16 h-4/6 rounded-2xl bg-gradient-to-r from-dark-blue from-[20%] to-light-blue">
          <div className="flex flex-col justify-center w-8/12 space-y-3">
            <div>
              <p className="font-semibold text-white">Plataforma</p>
              <h1 className="text-5xl font-bold text-white">
                Requisitos de Acceso a Mercados Internacionales
              </h1>
            </div>
            <p className="w-full font-normal text-gray-400">
              Inicia tus exportaciones explorando la herramienta Requisitos de
              Acceso a Mercados Internacionales (RAMI). Consulta las medidas,
              requisitos y regulaciones establecidas por cada país para admitir
              la entrada y la comercialización de mercancías importadas desde
              República Dominicana.
            </p>
            <Link
              href={"/dashboard/rami"}
              className="flex flex-row items-center h-12 space-x-3 text-sm font-semibold text-white justify-left w-44"
            >
              <p>Empieza</p>
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="absolute h-full right-36">
          <Image
            src={"/images/landing/mockupRami.png"}
            alt="rami"
            width={1450}
            height={2936}
            className="object-cover object-center w-full h-full p-14 text-end"
          />
        </div>
      </section>
    </div>
  );
}

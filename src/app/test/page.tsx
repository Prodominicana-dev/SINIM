"use client";

import React from "react";
import Image from "next/image";
import { Montserrat } from "next/font/google";

export default function page() {
  return (
    <div className="w-full">
      <section
        id="sinim"
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
          <button className="h-12 text-white border-2 border-white rounded-md w-44">
            Empezar
          </button>
        </div>
        <div className="w-full h-full bg-white border-t-2 border-l-2 border-r-2 rounded-t-lg sm:w-10/12 ">
          {/* Reemplaza la ruta de la imagen en el src */}
        </div>
      </section>
    </div>
  );
}

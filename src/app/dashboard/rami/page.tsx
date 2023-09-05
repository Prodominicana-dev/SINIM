import React from "react";

export default function Page() {
  return (
    <div className="w-full min-h-full relative">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          src="/videos/rami.mp4"
          typeof="video/mp4"
        ></video>
      </div>
      <div className="absolute inset-0 bg-black opacity-60 border-0"></div>
      <div className="relative flex flex-col items-center justify-center">
        <div className="inline-flex space-x-10 py-10">
          <div className="bg-white text-black font-bold rounded-full p-4 cursor-pointer">
            <a href="">Oportunidades</a>
          </div>
          <div className="bg-black/50 hover:bg-white hover:text-black rounded-full p-4 duration-300 cursor-pointer">
            <a href="">Actualizaciones</a>
          </div>
          <div className="bg-black/50 hover:bg-white hover:text-black rounded-full p-4 duration-300 cursor-pointer">
            <a href="">Amenazas</a>
          </div>
          <div className="bg-black/50 hover:bg-white hover:text-black rounded-full p-4 duration-300 cursor-pointer">
            <a href="">Obstaculos</a>
          </div>
        </div>
        <div className="w-3/12 text-center text-white text-2xl font-bold">
          Descubra Nuevas Oportunidades de Negocio
        </div>
        <div className="w-4/12 my-4 text-center text-normal">
          Explore oportunidades emergentes, tendencias y nichos de mercado que
          pueden impulsar su crecimiento empresarial.
        </div>
      </div>
    </div>
  );
}

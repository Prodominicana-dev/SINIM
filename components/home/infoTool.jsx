"use client";
import Image from "next/image";
import Link from "next/link";
import TypeWriterEffect from "@/components/typewriter/typewritereffect";
import { useState, useEffect } from "react";

export default function InfoTool({ description, logo, link }) {
  const [showDescription, setShowDescription] = useState(true);

  // Cuando la descripción cambie, establece showDescription en falso para reiniciar el efecto.
  useEffect(() => {
    // Establecer showDescription en true después de un pequeño retraso (100 ms)
    setShowDescription(false);
    setTimeout(() => {
      setShowDescription(true);
    }, 100);
  }, [description]);
  return (
    <div className="flex h-full md:h-5/6 md:p-5 ml-0 md:justify-start justify-center items-center md:absolute">
      <div className="flex flex-col space-y-6 mx-10 w-3/6">
        <Image
          src={logo}
          width={600}
          height={600}
          draggable={false}
          alt=""
          className="w-full h-2/6"
        ></Image>
        <p className="md:w-[32rem] md:text-sm text-xs md:block hidden h-2/6">
          {/* Si showDescription es verdadero, muestra el componente TypeWriterEffect */}
          {showDescription && (
            <TypeWriterEffect text={description} typeSpeed={20} />
          )}
        </p>
        <Link href={link} className="md:block hidden h-2/6">
          <div className="w-28 text-center text-sm bg-white text-black rounded-full px-5 py-1 duration-500">
            Ver mas
          </div>
        </Link>
      </div>
    </div>
  );
}

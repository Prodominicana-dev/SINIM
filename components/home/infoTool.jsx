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
    <div className="flex h-full lg:h-full sm:h-3/6 sm:p-5 ml-0 justify-start items-center lg:absolute sm:mt-8 lg:mt-0">
      <div className="flex flex-col space-y-6 mx-10 w-full sm:w-3/6">
        <Image
          src={logo}
          width={600}
          height={600}
          draggable={false}
          alt=""
          className="w-full "
        ></Image>
        <p className="md:w-[32rem] sm:text-sm text-xs block">
          {/* Si showDescription es verdadero, muestra el componente TypeWriterEffect */}
          {showDescription && (
            <TypeWriterEffect text={description} typeSpeed={20} />
          )}
        </p>
        <Link href={link} className="block">
          <div className="w-28 text-center text-sm bg-white text-black rounded-full px-5 py-1 duration-500">
            Ver mas
          </div>
        </Link>
      </div>
    </div>
  );
}

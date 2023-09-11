"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  Dialog,
  DialogHeader,
  IconButton,
  DialogBody,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";
import getSaim from "@/src/services/saim/getSaim";
import { useEffect, useState } from "react";
import Saim from "@/src/models/saim";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Saim>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSaim(params.id);
      setData(response);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>No existe</div>;
  }
  return (
    <div className="flex justify-center h-[40rem]">
      <div className="w-10/12 sm:w-8/12">
        <div className="text-base text-neutral-500">{data.category}</div>
        <div className="text-xl sm:text-3xl text-black font-bold my-2">
          {data.title}
        </div>
        <div className="text-xs font-light text-neutral-500">
          {format(new Date(data.date), "dd MMMM yyyy", { locale: es })}
        </div>
        <Image
          width={1920}
          height={1080}
          src={`https://sinim-api-git-tools-prodominicanadev.vercel.app/data/saim/${data.id}/img/${data.image}`}
          alt="card-image"
          className="object-cover w-full rounded-lg my-3"
        />
        <div
          className="pb-10 text-black text-lg"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>
    </div>
  );
}

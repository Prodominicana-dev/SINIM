import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

interface SaimData {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  link: string;
  image: string;
  date: Date;
}

export default function SaimCard(data: SaimData) {
  return (
    <Link href={`/dashboard/saim/${data.id}`}>
      <Card className="mt-6 w-full group cursor-pointer">
        <CardHeader color="blue-gray" className="relative ">
          <Image
            width={1920}
            height={1080}
            src={`https://sinim-api-git-tools-prodominicanadev.vercel.app/data/saim/${data.id}/img/${data.image}`}
            alt="card-image"
            className="object-cover h-52"
          />
        </CardHeader>
        <CardBody>
          <div className="text-gray-500">{data.category}</div>
          <div className="font-bold mb-2 line-clamp-2 text-xl">
            {data.title}
          </div>
          <div className="text-end text-xs">
            {format(new Date(data.date), "dd MMMM yyyy", { locale: es })}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
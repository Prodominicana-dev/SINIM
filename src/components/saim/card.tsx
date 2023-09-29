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
import Saim from "@/src/models/saim";

export default function SaimCard(data: Saim) {
  return (
    <Link prefetch href={`/dashboard/saim/${data.id}`}>
      <Card className="w-full mt-6 cursor-pointer group h-80">
        <CardHeader color="blue-gray" className="relative ">
          <Image
            width={1920}
            height={1080}
            src={`${process.env.NEXT_PUBLIC_API_URL}/data/saim/${data.id}/img/${data.image}`}
            alt="card-image"
            className="object-cover h-52"
          />
        </CardHeader>
        <CardBody>
          <div className="text-gray-500">{data.category}</div>
          <div className="mb-2 text-xl font-bold line-clamp-2">
            {data.title}
          </div>
          <div className="text-xs text-end">
            {format(new Date(data.date), "dd MMMM yyyy", { locale: es })}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

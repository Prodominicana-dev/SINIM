import Saim from "@/src/models/saim";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  CardHeader,
  CardBody,
  Tooltip,
  Typography,
  Card,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SaimDialog from "../../saim/Create/saimDialog";

export default function SCard(data: Saim) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Card className="w-full h-full shadow-lg">
      <CardHeader floated={false} className="h-56">
        <Image
          width={1920}
          height={1080}
          src={`http://127.0.0.1:3001/data/saim/${data.id}/img/${data.image}`}
          alt="foto"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <div className="text-gray-500">{data.category}</div>
        <div className="font-bold mb-2 line-clamp-2 text-lg">{data.title}</div>
        <div className="flex justify-center my-4">
          <Link
            href={`/dashboard/saim/${data.id}`}
            className="w-10 h-10 mx-3 bg-blue-600 hover:bg-blue-700 duration-300 rounded-full flex justify-center items-center"
          >
            <Tooltip content="Ver">
              <Typography variant="lead" color="green" textGradient>
                <EyeIcon className="text-white w-6 h-6" />
              </Typography>
            </Tooltip>
          </Link>
          <button
            onClick={handleOpen}
            className="w-10 h-10 mx-3 bg-green-600 hover:bg-green-700 duration-300 rounded-full flex justify-center items-center"
          >
            <Tooltip content="Editar">
              <Typography variant="lead" color="green" textGradient>
                <PencilIcon className="text-white w-6 h-6" />
              </Typography>
            </Tooltip>
          </button>
          <Link
            href={"/dashboard/saim"}
            className="w-10 h-10 mx-3 bg-red-600 hover:bg-red-700 duration-300 rounded-full flex justify-center items-center"
          >
            <Tooltip content="Eliminar">
              <Typography variant="lead" color="green" textGradient>
                <TrashIcon className="text-white w-6 h-6" />
              </Typography>
            </Tooltip>
          </Link>
        </div>
        <SaimDialog saim={data} open={open} handleOpen={handleOpen} />
      </CardBody>
    </Card>
  );
}

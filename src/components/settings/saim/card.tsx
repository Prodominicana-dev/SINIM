import Saim from "@/src/models/saim";
import { EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
import SaimDialog from "../../saim/Settings/saimDialog";
import axios from "axios";
import DeleteSaim from "./delete";

export default function SCard({
  data,
  updateSaims,
}: {
  data: Saim;
  updateSaims: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => {
    setDeleteOpen(!deleteOpen);
  };

  const isActive = data.status === "active" ? "" : "group opacity-50 bg-gray-200 hover:opacity-100 duration-300";
  return (
    <Card className={`w-full h-full shadow-lg ${isActive}`}>
      <CardHeader floated={false} className="h-56">
        <Image
          width={1920}
          height={1080}
          src={`${process.env.NEXT_PUBLIC_API_URL}/data/saim/${data.id}/img/${data.image}`}
          alt="foto"
          className="object-cover w-full h-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <div className="text-gray-500">{data.category}</div>
        <div className="flex items-center justify-center w-full h-16 mb-2 "><span className="text-lg font-bold line-clamp-2">{data.title}</span></div>
        <div className="flex justify-center my-4">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-green-600 rounded-full hover:bg-green-700"
          >
            <Tooltip content="Editar">
              <Typography variant="lead" color="green" textGradient>
                <PencilIcon className="w-6 h-6 text-white" />
              </Typography>
            </Tooltip>
          </button>
          {data.status === "active" ? (
            <button
            onClick={handleDeleteOpen}
            className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-black rounded-full "
          >
            <Tooltip content="Desactivar">
              <Typography variant="lead" color="green" textGradient>
                <EyeSlashIcon className="w-6 h-6 text-white" />
              </Typography>
            </Tooltip>
          </button>
          ): (
            <button
            onClick={handleDeleteOpen}
            className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-white rounded-full hover:bg-gray-300"
          >
            <Tooltip content="Activar">
              <Typography variant="lead" color="green" textGradient>
                <EyeIcon className="w-6 h-6 text-black" />
              </Typography>
            </Tooltip>
          </button>
          )}
          <button
            onClick={handleOpen}
            className="flex items-center justify-center w-10 h-10 mx-3 duration-300 bg-red-600 rounded-full hover:bg-red-700"
          >
            <Tooltip content="Eliminar">
              <Typography variant="lead" color="green" textGradient>
                <TrashIcon className="w-6 h-6 text-white" />
              </Typography>
            </Tooltip>
          </button>
        </div>
        <SaimDialog
          saim={data}
          open={open}
          handleOpen={handleOpen}
          updateSaims={updateSaims}
        />
        <DeleteSaim id={data.id} open={deleteOpen} handleOpen={handleDeleteOpen} updateSaims={updateSaims} />
      </CardBody>
    </Card>
  );
}

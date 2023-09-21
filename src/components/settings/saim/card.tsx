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
  return (
    <Card className="w-full h-full mt-5 shadow-lg">
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
        <div className="mb-2 text-lg font-bold line-clamp-2">{data.title}</div>
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
          <button
            onClick={handleDeleteOpen}
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

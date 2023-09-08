import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { data } from "autoprefixer";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

interface SaimDialogProps {
  handler: () => void;
  data: SaimData; // Aquí especifica el tipo de data
}

export default function SaimDialog({ handler, data }: SaimDialogProps) {
  const open = true;
  return (
    <Dialog
      open={open}
      handler={handler}
      size={"xl"}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className="h-screen"
    >
      <DialogHeader className="justify-end">
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handler}
        >
          <XMarkIcon className="w-7 m-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="flex justify-center h-[40rem] overflow-scroll">
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
      </DialogBody>
      {/* <DialogFooter>
        <Button variant="text" color="red" onClick={handler} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handler}>
          <span>Confirm</span>
        </Button>
      </DialogFooter> */}
    </Dialog>
  );
}

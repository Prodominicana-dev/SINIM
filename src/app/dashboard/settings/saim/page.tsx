"use client";
import Saim from "@/src/models/saim";
import getAllSaim from "@/src/services/saim/useSaims";
import { useCallback, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import SCard from "@/src/components/settings/saim/card";
import SaimDialog from "@/src/components/saim/Create/saimDialog";
import React from "react";
import { useAtom } from "jotai";
import useSaims from "@/src/services/saim/useSaims";
import { saimAtom } from "@/src/state/states";

export default function Page() {
  const [data, setData] = useAtom(saimAtom);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="w-full h-full flex flex-col justify-center items-center my-10">
        <div className=" w-8/12 flex flex-row justify-between items-center">
          <Button
            variant="outlined"
            className="rounded-full w-44 hover:bg-gray-200 duration-300 cursor-pointer"
          >
            Oportunidades
          </Button>
          <Button
            variant="outlined"
            className="rounded-full w-44 cursor-pointer"
          >
            Actualizaciones
          </Button>
          <Button
            variant="outlined"
            className="rounded-full w-44 cursor-pointer"
          >
            Amenazas
          </Button>
          <Button
            variant="outlined"
            className="rounded-full w-44 cursor-pointer"
          >
            Obstáculos
          </Button>
        </div>
        <div className="flex w-11/12 justify-end ">
          <div className="w-3/12 h-16">
            <div className="flex flex-row bg-white p-5 w-full h-full rounded-full my-10 border-[1px] border-black">
              <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
              <input
                placeholder="Producto o código arancelario..."
                className="w-10/12  text-black outline-none"
                name="search"
              />
            </div>
          </div>
        </div>
        {/* 
               SAIMS
            */}
        <div className="w-full h-[28rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-10">
          <button
            className="w-full h-full flex justify-center items-center rounded-3xl border-2 border-dashed border-black cursor-pointer hover:bg-gray-200 duration-300"
            onClick={handleOpen}
          >
            <PlusIcon className="w-16 h-16 text-black" />
          </button>
          {data?.map((saim) => (
            <div className="w-full h-full">
              <SCard key={saim.id} {...saim} />
            </div>
          ))}
        </div>
        <SaimDialog open={open} handleOpen={handleOpen} updateSaim={() => {}} />
      </div>
    </div>
  );
}

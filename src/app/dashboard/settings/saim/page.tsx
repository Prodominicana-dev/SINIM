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
import SaimDialog from "@/src/components/saim/Settings/saimDialog";
import React from "react";
import { useAtom } from "jotai";
import useSaims from "@/src/services/saim/useSaims";
import { saimAtom } from "@/src/state/states";
import SettingsFeed from "@/src/components/saim/Settings/settingsFeed";
import { useSaimsPage } from "@/src/services/saim/useSaimsPage";

export default function Page() {
  const [data, setData] = useAtom(saimAtom);
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const updateSaims = () => {
    setRefresh(!refresh);
  }
  const {refetch} = useSaims();
// , { fetchNextPage, hasNextPage, data: d, refetch: _refetch }
  const pagination = useSaimsPage();

  useEffect(() => {
    refetch().then((res) => {
      setData(res.data);
    });
    pagination.refetch();
  }, [refresh])
  
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full h-full my-10 space-y-8">
        <div className="flex flex-row items-center justify-between w-8/12 ">
          <Button
            variant="outlined"
            className="duration-300 rounded-full cursor-pointer w-44 hover:bg-gray-200"
          >
            Oportunidades
          </Button>
          <Button
            variant="outlined"
            className="rounded-full cursor-pointer w-44"
          >
            Actualizaciones
          </Button>
          <Button
            variant="outlined"
            className="rounded-full cursor-pointer w-44"
          >
            Amenazas
          </Button>
          <Button
            variant="outlined"
            className="rounded-full cursor-pointer w-44"
          >
            Obstáculos
          </Button>
        </div>
        <div className="flex justify-end w-11/12 h-full">
          <div className="w-3/12 h-16">
            <div className="flex flex-row bg-white p-5 w-full h-full rounded-full my-10 border-[1px] border-black">
              <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
              <input
                placeholder="Producto o código arancelario..."
                className="w-10/12 text-black outline-none"
                name="search"
              />
            </div>
          </div>
        </div>
        {/* 
               SAIMS
            */}
        <div className="grid w-full grid-cols-1 gap-10 p-8 h-72 sm:grid-cols-2 lg:grid-cols-4 ">
          <button
            className="flex items-center justify-center w-full h-full mt-5 duration-300 border-2 border-black border-dashed cursor-pointer rounded-3xl hover:bg-gray-200"
            onClick={handleOpen}
          >
            <PlusIcon className="w-16 h-16 text-black" />
          </button>
          <SettingsFeed queryI={pagination} updateSaims={updateSaims}/>
        </div>
        <SaimDialog
          open={open}
          handleOpen={handleOpen}
          updateSaims={updateSaims}
        />
      </div>
    </div>
  );
}

"use client";

import { ramiAtom } from "@/src/state/states";
import { useAtom } from "jotai";
import React from "react";
import Card from "@/src/components/settings/rami/card";
import useRamisSettings from "@/src/services/ramis/useRamisSettings";

export default function Page() {
  const { data, isLoading, isError } = useRamisSettings();

  return (
    <div className="p-8">
      <div className="w-full space-y-5">
        <div className="grid grid-cols-5 items-center justify-between w-full h-24 bg-white ring-2 ring-gray-100 rounded-lg p-5 font-bold text-center">
          <div>#</div>
          <div className="text-center">Producto</div>
          <div>Codigo</div>
          <div>Pais</div>
          <div>Accion</div>
        </div>
        {data?.map((rami: any, key: number) => {
          return <Card key={key} rami={rami} />;
        })}
      </div>
    </div>
  );
}

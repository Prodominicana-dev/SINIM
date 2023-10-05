import Rami from "@/src/models/rami";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function Card({ rami }: { rami: any }) {
  return (
    <div className="grid grid-cols-5 items-center w-full h-24 bg-white ring-2 ring-gray-100 rounded-lg text-center p-5">
      <div>{rami.id}</div>
      <div>{rami.product.name}</div>
      <div>{rami.product.code}</div>
      <div>{rami.country.name}</div>
      <div className="flex justify-center space-x-5 ">
        <button className="flex justify-center items-center w-14 h-14 bg-white text-black ring-1 ring-gray-100 rounded-lg">
          <PencilSquareIcon className="w-7" />
        </button>
        <button className="flex justify-center items-center w-14 h-14 bg-white text-black ring-1 ring-gray-100 rounded-lg">
          <TrashIcon className="w-7" />
        </button>
      </div>
    </div>
  );
}

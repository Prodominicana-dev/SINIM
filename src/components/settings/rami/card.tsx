import Rami from "@/src/models/rami";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import RamiDialog from "../../rami/dialog";

export default function Card({ rami, updateRamis }: { rami: any, updateRamis: () => void }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
    <div className="grid items-center w-full h-24 grid-cols-4 p-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
          <div>{rami.product.name}</div>
          <div>{rami.product.code}</div>
          <div>{rami.country.name}</div>
          <div className="flex justify-center space-x-5 ">
            <button onClick={handleOpen} className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100">
              <PencilSquareIcon className="w-7" />
            </button>
            <button className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100">
              <TrashIcon className="w-7" />
            </button>
          </div>
        </div>
      { open ? <RamiDialog rami={rami} open={open} handleOpen={handleClose} updateRami={updateRamis} title={"Editar RAMI"} /> : null}
    </>
    
    
  );
}

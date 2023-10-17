import Rami from "@/src/models/rami";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import RamiDialog from "./dialog";
import DeleteButton from "../saim/delete";

export default function Card({
  rami,
  updateRamis,
}: {
  rami: any;
  updateRamis: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const deleteCreateNotification = {
    title: "RAMI eliminado",
    message: "El RAMI ha sido eliminada exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando el RAMI",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };
  

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-4 p-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
        <div>{rami.product.name}</div>
        <div>{rami.product.code}</div>
        <div>{rami.country.name}</div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <button className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100" 
            onClick={handleDeleteOpen}>
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      <DeleteButton
          open={deleteOpen}
          handleOpen={handleDeleteOpen}
          updateSaims={updateRamis}
          title={"¿Estás seguro de eliminar este Requisito?"}
          message="El RAMI será eliminada y no podrá ser recuperada."
          endpoint={`/rami/${rami.id}`}
          createNotification={deleteCreateNotification}
          errorNotification={deleteErrorNotification}
        />
      {open ? (
        <RamiDialog
          rami={rami}
          open={open}
          handleOpen={handleClose}
          updateRami={updateRamis}
          title={"Editar RAMI"}
        />
      ) : null}
    </>
  );
}

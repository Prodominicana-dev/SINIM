import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Datamarket from "@/src/models/datamarket";
import DatamarketDialog from "./dialog";
import HideButton from "../hide";
import ActiveButton from "../active";

export default function Card({
  datamarket,
  updateDatamarkets,
}: {
  datamarket: Datamarket;
  updateDatamarkets: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const deleteCreateNotification = {
    title: "Datamarketo ocultado",
    message: "El Datamarket ha sido ocultado exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando el Datamarket",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  const [activeOpen, setActiveOpen] = useState(false);
  const handleActiveOpen = () => setActiveOpen(!deleteOpen);
  const handleActiveClose = () => setActiveOpen(false);
  const activeCreateNotification = {
    title: "Datamarketo activado",
    message: "El Datamarket ha sido activado exitosamente.",
    color: "green",
  };

  const activeErrorNotification = {
    title: "Error activando el Datamarket",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-4 p-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
        <div className="line-clamp-2">{datamarket.title}</div>
        <div className="line-clamp-1">{datamarket.url}</div>
        {datamarket.status === "active" ? <div>Activo</div> : <div>Oculto</div>}
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          {datamarket.status === "active" ? (
            <button
              className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              onClick={handleDeleteOpen}
            >
              <EyeSlashIcon className="w-7" />
            </button>
          ) : (
            <button
              className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              onClick={handleActiveOpen}
            >
              <EyeIcon className="w-7" />
            </button>
          )}
        </div>
      </div>
      <HideButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={updateDatamarkets}
        title={"¿Estás seguro de ocultar este Datamarket?"}
        message="El Datamarket será ocultado y podrá ser activado."
        endpoint={`/datamarket/deactive/${datamarket.id}`}
        createNotification={deleteCreateNotification}
        errorNotification={deleteErrorNotification}
      />
      <ActiveButton
        open={activeOpen}
        handleOpen={handleActiveClose}
        update={updateDatamarkets}
        title={"¿Estás seguro de activar este Datamarket?"}
        message="El Datamarket será activado y cualquier persona podría verlo."
        endpoint={`/datamarket/${datamarket.id}`}
        createNotification={activeCreateNotification}
        errorNotification={activeErrorNotification}
      />
      {open ? (
        <DatamarketDialog
          open={open}
          handleOpen={handleOpen}
          updateDatamarkets={updateDatamarkets}
          datamarket={datamarket}
        />
      ) : null}
    </>
  );
}

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DeleteButton from "../delete";
import PostDialog from "./dialog";



export default function Card({
  post,
  update,
}: {
    post: any;
    update: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const deleteCreateNotification = {
    title: "Fuente eliminada",
    message: "La fuente de información ha sido eliminada exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando la fuente",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg sm:grid-cols-4 lg:grid-cols-6 ring-2 ring-gray-100">
        <div>{post.title}</div>
        <div className="hidden sm:block">{post.category}</div>
        <div className="hidden truncate line-clamp-1 lg:block">{post.type}</div>
        <div>{post.language}</div>
        <div className="hidden lg:block">{post.pdf}</div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleOpen}
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <button
            className="flex items-center justify-center text-black bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            onClick={handleDeleteOpen}
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      <DeleteButton
        open={deleteOpen}
        handleOpen={handleDeleteOpen}
        update={update}
        title={"¿Estás seguro de eliminar esta fuente?"}
        message="La fuente será eliminada y no podrá ser recuperada."
        endpoint={`/partner/${post.id}`}
        createNotification={deleteCreateNotification}
        errorNotification={deleteErrorNotification}
      />
       {open ? (
        <>
        <PostDialog 
        post={post}
        open={open}
        handleOpen={handleOpen}
        update={update}
        />
        </>
      ) : null}
    </>
  );
}

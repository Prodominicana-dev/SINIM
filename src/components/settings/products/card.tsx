import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Product from "@/src/models/product";
import ProductDialog from "./dialog";
import DeleteButton from "../saim/delete";
import HideButton from "../saim/hide";

export default function Card({
  product,
  updateProducts,
}: {
  product: Product;
  updateProducts: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);
  const deleteCreateNotification = {
    title: "Producto ocultado",
    message: "El producto ha sido ocultado exitosamente.",
    color: "green",
  };

  const deleteErrorNotification = {
    title: "Error eliminando el producto",
    message: "Ha ocurrido un error, intenta nuevamente.",
    color: "red",
  };

  return (
    <>
      <div className="grid items-center w-full h-24 grid-cols-3 p-5 text-center bg-white rounded-lg ring-2 ring-gray-100">
        <div className="line-clamp-2">{product.name}</div>
        <div>{product.code}</div>
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
      <HideButton
          open={deleteOpen}
          handleOpen={handleDeleteOpen}
          updateSaims={updateProducts}
          title={"¿Estás seguro de eliminar este producto?"}
          message="El producto será desactivado y no podrá ser recuperada."
          endpoint={`/product/${product.id}`}
          createNotification={deleteCreateNotification}
          errorNotification={deleteErrorNotification}
        />
      {open ? (
        <ProductDialog
          open={open}
          handleOpen={handleOpen}
          updateProducts={updateProducts}
          product={product}
        />
      ) : null}
    </>
  );
}

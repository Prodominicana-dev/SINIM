import { createProduct, updateProduct } from "@/src/services/products/service";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import Product from "@/src/models/product";

export default function ProductDialog({
  product,
  open,
  handleOpen,
  updateProducts,
}: {
  product?: Product;
  open: boolean;
  handleOpen: () => void;
  updateProducts: () => void;
}) {
  const [productName, setProductName] = useState<any>(product?.name);
  const [productCode, setProductCode] = useState<any>(product?.code);

  const handleProductSubmit = async () => {
    const _product = {
      id: product?.id || 0,
      name: productName,
      code: productCode,
    };

    const action = _product.id !== 0 ? updateProduct : createProduct;

    action({ product: _product, handleOpen, updateProducts });
  };

  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          {product ? "Editar Producto" : "Agregar Producto"}
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Nombre"
              crossOrigin={""}
              onChange={(e) => setProductName(e.target.value)}
              defaultValue={product?.name || ""}
            />
            <Input
              label="Codigo"
              crossOrigin={""}
              onChange={(e) => setProductCode(e.target.value)}
              defaultValue={product?.code || ""}
            />
            <Button className="bg-navy" onClick={handleProductSubmit}>
              {product ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Datamarket from "@/src/models/datamarket";
import {
  createDatamarket,
  updateDatamarket,
  useDataMarketsCategories,
} from "@/src/services/datamarket/service";

export default function DatamarketDialog({
  datamarket,
  open,
  handleOpen,
  updateDatamarkets,
}: {
  datamarket?: Datamarket;
  open: boolean;
  handleOpen: () => void;
  updateDatamarkets: () => void;
}) {
  const [datamarketTitle, setDatamarketTitle] = useState<any>(
    datamarket?.title
  );
  console.log(datamarket);
  const [datamarketUrl, setDatamarketUrl] = useState<any>(datamarket?.url);
  const [datamarketCategory, setDatamarketCategory] = useState(
    datamarket?.category
  );
  const { data } = useDataMarketsCategories();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleDatamarketSubmit = async () => {
    const _datamarket = {
      id: datamarket?.id || 0,
      title: datamarketTitle,
      category: datamarketCategory,
      url: datamarketUrl,
    };

    const action = _datamarket.id !== 0 ? updateDatamarket : createDatamarket;

    action({ datamarket: _datamarket, handleOpen, updateDatamarkets });
  };

  return (
    <div>
      <Dialog size="xs" open={open} handler={handleOpen}>
        <DialogHeader>
          {datamarket ? "Editar Datamarket" : "Agregar Datamarket"}
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <Input
              label="Título"
              crossOrigin={""}
              onChange={(e) => setDatamarketTitle(e.target.value)}
              defaultValue={datamarket?.title || ""}
            />
            <Input
              label="Url"
              crossOrigin={""}
              onChange={(e) => setDatamarketUrl(e.target.value)}
              defaultValue={datamarket?.url || ""}
            />
            <Input
              list="categories"
              crossOrigin={""}
              label="Catetogoria"
              onChange={(e) => setDatamarketCategory(e.target.value)}
              defaultValue={datamarket?.category || ""}
              value={datamarketCategory}
            />
            <datalist id="categories">
              {data?.map((value: any, index: any) => (
                <option key={index} value={value.category} />
              ))}
            </datalist>
            <Button className="bg-navy" onClick={handleDatamarketSubmit}>
              {datamarket ? "Actualizar" : "Guardar"}
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

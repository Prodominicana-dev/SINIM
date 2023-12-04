import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { useState } from "react";
import Datamarket from "@/src/models/datamarket";
import {
  createDatamarket,
  updateDatamarket,
  useDataMarketsCategories,
} from "@/src/services/datamarket/service";
import React from "react";

export default function SortCategory({
  categories,
  open,
  handleOpen,
  updateDatamarkets,
}: {
  categories: any;
  open: boolean;
  handleOpen: () => void;
  updateDatamarkets: () => void;
}) {
  const [datamarketTitle, setDatamarketTitle] = useState<any>();
  const [datamarketUrl, setDatamarketUrl] = useState<any>();
  const [datamarketCategory, setDatamarketCategory] = useState();
  const { data } = useDataMarketsCategories();
  const [isLoading, setIsLoading] = useState(false);

  const handleDatamarketSubmit = async () => {
    setIsLoading(true);
    const data: { [key: string]: any } = {
      title: datamarketTitle,
      category: datamarketCategory,
      url: datamarketUrl,
    };
  };

  return (
    <div>
      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogHeader>{"Ordenar categorías y datamarkets"}</DialogHeader>
        <DialogBody>
          <table className="w-full text-left text-black table-auto">
            <thead>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                Categoría
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                Prioridad
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                Acción
              </th>
            </thead>
            <tbody>
              {categories?.map((category: any, key: number) => {
                return (
                  <tr key={key}>
                    <td className="p-4 border-b border-blue-gray-100">
                      {category.category}
                    </td>
                    <td className="p-4 border-b border-blue-gray-100">
                      <input type="number" id="" min={1} value={1} />
                    </td>
                    <td className="p-4 border-b border-blue-gray-100"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DialogBody>
      </Dialog>
    </div>
  );
}

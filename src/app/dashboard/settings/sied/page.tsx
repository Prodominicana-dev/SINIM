"use client";
import Sied from "@/src/models/sied";
import { useState, useEffect, ChangeEvent } from "react";
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SCard from "@/src/components/settings/sied/card";
import SiedDialog from "@/src/components/settings/sied/dialog";
import { Select } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import Header from "@/src/components/settings/header";
import {
  useSiedsPage,
  useSieds,
  useSiedsCategory,
} from "@/src/services/sied/service";
import Category from "@/src/models/category";

export default function Page() {
  const [data, setData] = useState<Sied[]>([]);
  const [filteredData, setFilteredData] = useState<Sied[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterSieds, setFilterSieds] = useState([]);
  const [status, setStatus] = useState("");

  const handleOpen = () => {
    setOpen(!open);
  };

  const update = () => {
    setRefresh(!refresh);
  };
  const { data: d, refetch } = useSieds();
  useEffect(() => {
    setData(d);
  }, [d]);

  const pagination = useSiedsPage();

  useEffect(() => {
    refetch().then((res: any) => {
      setData(res.data);
    });
    pagination.refetch();
  }, [refresh, refetch, pagination]);

  useEffect(() => {
    setFilteredData(data);
  }, [data, setFilteredData]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterData = () => {
    const filteredByCategory =
      category === "Todos"
        ? data
        : data.filter(
            (sied) =>
              sied.category.name.toLowerCase() === category.toLowerCase()
          );

    let filteredBySearch;

    if (!status) {
      // Si no se ha seleccionado un estado, mostrar todos los registros
      filteredBySearch = filteredByCategory.filter(
        (sied) =>
          sied.title.toLowerCase().includes(search.toLowerCase()) ||
          sied.category.name.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      // Si se ha seleccionado un estado, filtrar por estado y búsqueda
      filteredBySearch = filteredByCategory.filter(
        (sied) =>
          sied.status.toLowerCase() === status.toLowerCase() &&
          (sied.title.toLowerCase().includes(search.toLowerCase()) ||
            sied.category.name.toLowerCase().includes(search.toLowerCase()))
      );
    }

    setFilteredData(filteredBySearch);
  };

  useEffect(() => {
    filterData();
  }, [search, category]);

  const { data: categories, isLoading } = useSiedsCategory();
  useEffect(() => {
    if (!isLoading) {
      const names = categories.map((category: Category) => category.name);
      names.unshift("Todos");
      setFilterSieds(names);
    }
  }, [categories, isLoading]);

  const statusSaims = [
    { label: "Publicados", value: "active" },
    { label: "Ocultos", value: "deleted" },
  ];
  const statusSieds = [
    { label: "Publicados", value: "active" },
    { label: "Ocultos", value: "deleted" },
  ];

  const handleFilter = (selectedCategory: string | null) => {
    const statusToFilter = status || "active";
    const categoryToFilter = selectedCategory || "Todos";

    if (categoryToFilter.toLowerCase() == "todos") {
      const SiedByCategory = data.filter(
        (sied) => sied.status.toLowerCase() === statusToFilter.toLowerCase()
      );
      setCategory(categoryToFilter);
      setFilteredData(SiedByCategory);
    } else {
      const SiedByCategory = data.filter(
        (sied) =>
          sied.category.name.toLowerCase() === categoryToFilter.toLowerCase() &&
          sied.status.toLowerCase() === statusToFilter.toLowerCase()
      );
      setCategory(categoryToFilter);
      setFilteredData(SiedByCategory);
    }
  };

  const handleStatus = (selectedStatus: string | null) => {
    const statusToFilter = selectedStatus || "active";
    const categoryToFilter = category || "Todos";

    const SiedByStatus =
      categoryToFilter !== "Todos"
        ? data.filter(
            (sied) =>
              sied.status.toLowerCase() === statusToFilter.toLowerCase() &&
              sied.category.name.toLowerCase() ===
                categoryToFilter.toLowerCase()
          )
        : data.filter(
            (sied) => sied.status.toLowerCase() === statusToFilter.toLowerCase()
          );
    setStatus(statusToFilter);
    console.log(SiedByStatus);
    setFilteredData(SiedByStatus);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const isVisible = filterOpen ? "visible" : "hidden";

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Header
          title="Gestión de Alertas de IED"
          message="Tu centro de operaciones personal para alertas de IED. Agrega, edita y oculta información clave al instante. Toma el control de tus alertas."
        />
        <div className="w-full h-16">
          <div className="flex flex-row flex-wrap justify-end w-full h-full p-8 space-x-8">
            <input
              type="text"
              className="w-56 h-10 px-5 rounded-full ring-2 ring-gray-300"
              placeholder="Buscar..."
              value={search}
              onChange={handleSearchChange}
            />

            <Button
              onClick={handleFilterOpen}
              className="flex items-center h-10 gap-3 text-black duration-100 bg-white rounded-full shadow-none ring-gray-300 ring-2 hover:ring hover:shadow-none w-36"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              Filtrar
            </Button>
          </div>
        </div>

        <div
          className={`${isVisible} flex flex-row w-full px-8 pt-8 pb-4 space-x-8 justify-end`}
        >
          <div className="flex flex-col w-2/12 space-y-2">
            <label className="">Categorías</label>
            <Select
              className="w-full"
              size="md"
              radius="md"
              data={filterSieds}
              defaultValue="Todos"
              searchable={false}
              value={category}
              onChange={(e: string | null) => handleFilter(e)}
            />
          </div>
          <div className="flex flex-col w-2/12 space-y-2">
            <label className="">Estado</label>
            <Select
              className="w-full"
              size="md"
              radius="md"
              data={statusSieds}
              placeholder="Estado"
              searchable={false}
              value={status}
              onChange={(e: string | null) => handleStatus(e)}
            />
          </div>
          <div className="flex items-end justify-end">
            <button
              className="flex items-center justify-center w-10 h-10 text-white duration-300 bg-red-600 rounded-lg hover:bg-red-700"
              onClick={() => {
                setFilterOpen(false);
                setCategory("Todos");
                setStatus("");
                setSearch("");
              }}
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        {/* SAIMS */}
        <div className="grid w-full h-full grid-cols-1 gap-10 px-8 py-4 sm:grid-cols-2 lg:grid-cols-4 ">
          <button
            className="flex items-center justify-center w-full duration-300 border-2 border-black border-dashed cursor-pointer h-[28rem] rounded-3xl hover:bg-gray-200"
            onClick={handleOpen}
          >
            <PlusIcon className="w-16 h-16 text-black" />
          </button>
          {/* {search === "" && category === "Todos" && status === "active" ? (
            <SettingsFeed queryI={pagination} update={update} />
          ) : (
            filteredData?.map((sied) => {
              return (
                <SCard key={sied.id} data={sied} update={update} />
              );
            })
          )} */}
          {filteredData?.map((sied) => {
            return <SCard key={sied.id} data={sied} update={update} />;
          })}
        </div>
        <SiedDialog open={open} handleOpen={handleOpen} update={update} />
      </div>
    </div>
  );
}

"use client";
import Saim from "@/src/models/saim";
import { useState, useEffect } from "react";
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SCard from "@/src/components/settings/saim/card";
import SaimDialog from "@/src/components/settings/saim/dialog";
import React from "react";
import { Select } from "@mantine/core";
import { Button } from "@material-tailwind/react";
import Header from "@/src/components/settings/header";
import useSaims, {
  useSaimsCategory,
  useSaimsPage,
} from "@/src/services/saim/service";
import Category from "@/src/models/category";

export default function Page() {
  const [data, setData] = useState<Saim[]>([]);
  const [filteredData, setFilteredData] = useState<Saim[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [filterSaims, setFilterSaims] = useState([]);
  const handleOpen = () => {
    setOpen(!open);
  };

  const update = () => {
    setRefresh(!refresh);
  };
  const { data: d, refetch } = useSaims();
  useEffect(() => {
    setData(d);
  }, [d]);

  const pagination = useSaimsPage();

  useEffect(() => {
    refetch().then((res) => {
      setData(res.data);
    });
    pagination.refetch();
  }, [refresh, refetch, pagination]);

  useEffect(() => {
    setFilteredData(data);
  }, [data, setFilteredData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterData = () => {
    const filteredByCategory =
      category === "Todos"
        ? data
        : data.filter(
            (saim) =>
              saim.category.name.toLowerCase() === category.toLowerCase()
          );

    let filteredBySearch;

    if (!status) {
      // Si no se ha seleccionado un estado, mostrar todos los registros
      filteredBySearch = filteredByCategory.filter(
        (saim) =>
          saim.title.toLowerCase().includes(search.toLowerCase()) ||
          saim.products.some(
            (product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.code.toLowerCase().includes(search.toLowerCase())
          )
      );
    } else {
      // Si se ha seleccionado un estado, filtrar por estado y búsqueda
      filteredBySearch = filteredByCategory.filter(
        (saim) =>
          saim.status.toLowerCase() === status.toLowerCase() &&
          (saim.title.toLowerCase().includes(search.toLowerCase()) ||
            saim.products.some(
              (product) =>
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.code.toLowerCase().includes(search.toLowerCase())
            ))
      );
    }

    setFilteredData(filteredBySearch);
  };

  useEffect(() => {
    filterData();
  }, [search, category]);

  const { data: categories, isLoading } = useSaimsCategory();
  useEffect(() => {
    if (!isLoading) {
      const names = categories.map((category: Category) => category.name);
      names.unshift("Todos");
      setFilterSaims(names);
    }
  }, [categories, isLoading]);

  const statusSaims = [
    { label: "Publicados", value: "active" },
    { label: "Ocultos", value: "deleted" },
  ];

  const handleFilter = (selectedCategory: string) => {
    const statusToFilter = status || "active";
    const categoryToFilter = selectedCategory || "Todos";

    if (categoryToFilter.toLowerCase() == "todos") {
      const SaimByCategory = data.filter(
        (saim) => saim.status.toLowerCase() === statusToFilter.toLowerCase()
      );
      setCategory(categoryToFilter);
      setFilteredData(SaimByCategory);
    } else {
      const SaimByCategory = data.filter(
        (saim) =>
          saim.category.name.toLowerCase() === categoryToFilter.toLowerCase() &&
          saim.status.toLowerCase() === statusToFilter.toLowerCase()
      );
      setCategory(categoryToFilter);
      setFilteredData(SaimByCategory);
    }
  };

  const handleStatus = (selectedStatus: string) => {
    const statusToFilter = selectedStatus || "active";
    const categoryToFilter = category || "Todos";

    const SaimByStatus =
      categoryToFilter !== "Todos"
        ? data.filter(
            (saim) =>
              saim.status.toLowerCase() === statusToFilter.toLowerCase() &&
              saim.category.name.toLowerCase() ===
                categoryToFilter.toLowerCase()
          )
        : data.filter(
            (saim) => saim.status.toLowerCase() === statusToFilter.toLowerCase()
          );
    setStatus(statusToFilter);
    console.log(SaimByStatus);
    setFilteredData(SaimByStatus);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const isVisible = filterOpen ? "visible" : "hidden";

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Header
          title="Gestión de Alertas Comerciales"
          message="Tu centro de operaciones personal para alertas comerciales. Agrega, edita y oculta información clave al instante. Toma el control de tus alertas."
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
              data={filterSaims}
              defaultValue="Todos"
              searchable={false}
              value={category}
              onChange={(e: string) => handleFilter(e)}
            />
          </div>
          <div className="flex flex-col w-2/12 space-y-2">
            <label className="">Estado</label>
            <Select
              className="w-full"
              size="md"
              radius="md"
              data={statusSaims}
              placeholder="Estado"
              searchable={false}
              value={status}
              onChange={(e: string) => handleStatus(e)}
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
            filteredData?.map((saim) => {
              return (
                <SCard key={saim.id} data={saim} update={update} />
              );
            })
          )} */}
          {filteredData?.map((saim) => {
            return <SCard key={saim.id} data={saim} update={update} />;
          })}
        </div>
        <SaimDialog open={open} handleOpen={handleOpen} update={update} />
      </div>
    </div>
  );
}

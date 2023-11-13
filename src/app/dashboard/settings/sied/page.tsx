"use client";
import React from "react";
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
import Header from "@/src/components/settings/header";
import {
  useSiedsPage,
  useSieds,
  useSiedsCategory,
} from "@/src/services/sied/service";
import Category from "@/src/models/category";
import Settings from "@/src/components/validate/settings";
import NotFound from "@/src/components/validate/notFound";

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
  const [total, setTotal] = useState(0);

  const handleOpen = () => {
    setOpen(!open);
  };

  const update = () => {
    setRefresh(!refresh);
  };
  const { data: d, refetch } = useSieds();
  useEffect(() => {
    setData(d);
    setTotal(d?.length);
  }, [d]);

  const pagination = useSiedsPage();

  useEffect(() => {
    refetch().then((res: any) => {
      setData(res.data);
      setTotal(res.data?.length);
    });
    pagination.refetch();
  }, [refresh, refetch]);

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
    setTotal(filteredBySearch?.length);
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
      setTotal(SiedByCategory?.length);
    } else {
      const SiedByCategory = data.filter(
        (sied) =>
          sied.category.name.toLowerCase() === categoryToFilter.toLowerCase() &&
          sied.status.toLowerCase() === statusToFilter.toLowerCase()
      );
      setCategory(categoryToFilter);
      setFilteredData(SiedByCategory);
      setTotal(SiedByCategory?.length);
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
    setFilteredData(SiedByStatus);
    setTotal(SiedByStatus?.length);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  const isVisible = filterOpen ? "visible" : "hidden";

  return (
    <>
      <Settings permissionsList={["create:sied", "update:sied", "delete:sied"]}>
        <div>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Header
              title="Gestión de Alertas de IED"
              message="Tu centro de operaciones personal para alertas de IED. Agrega, edita y oculta información clave al instante. Toma el control de tus alertas."
            />
            <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row ">
              <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
                Cantidad de alertas de IED: {total}
              </div>
              <div className="flex flex-col justify-end w-full h-full space-y-2 sm:w-8/12 sm:space-y-0 sm:space-x-8 sm:flex-row sm:flex-wrap">
                <button
                  onClick={handleOpen}
                  className={
                    total === 0
                      ? `flex items-center justify-center w-full h-10 gap-3 text-white duration-100 rounded-lg sm:rounded-full shadow-none bg-navy sm:w-44`
                      : `hidden`
                  }
                >
                  Crear alerta de IED
                </button>
                <input
                  type="text"
                  className="w-full h-10 px-5 rounded-full sm:80 lg:w-56 ring-2 ring-gray-300"
                  placeholder="Buscar..."
                  value={search}
                  onChange={handleSearchChange}
                />

                <button
                  onClick={handleFilterOpen}
                  className={`text-navy flex flex-row justify-center items-center space-x-2 w-full sm:w-44 h-10 text-center bg-white rounded-lg sm:border-full hover:shadow-lg font-semibold duration-300 hover:text-navy/80 border-2 border-navy`}
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  <div>Filtrar</div>
                </button>
              </div>
            </div>

            <div
              className={`${isVisible} flex sm:flex-row flex-col w-full px-4 sm:px-8 pb-4 sm:space-x-8 space-y-2 sm:space-y-0 justify-center sm:justify-end`}
            >
              <div className="flex flex-col w-full space-y-2 sm:w-2/12">
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
              <div className="flex flex-col w-full space-y-2 sm:w-2/12">
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
            {/* SIEDS */}
            {filteredData?.length === 0 ? (
              <NotFound />
            ) : (
              <>
                <div className="grid w-full h-full grid-cols-1 gap-10 px-8 py-4 sm:grid-cols-2 lg:grid-cols-4 ">
                  <button
                    className="hidden sm:flex items-center justify-center w-full duration-300 border-2 border-black border-dashed cursor-pointer h-[28rem] rounded-3xl hover:bg-gray-200"
                    onClick={handleOpen}
                  >
                    <PlusIcon className="w-16 h-16 text-black" />
                  </button>

                  {filteredData?.map((sied) => {
                    return <SCard key={sied.id} data={sied} update={update} />;
                  })}
                </div>
              </>
            )}

            <SiedDialog open={open} handleOpen={handleOpen} update={update} />
          </div>
        </div>
      </Settings>
    </>
  );
}

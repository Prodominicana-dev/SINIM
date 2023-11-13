"use client";
import Saim from "@/src/models/saim";
import React from "react";
import { useState, useEffect, ChangeEvent } from "react";
import {
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SCard from "@/src/components/settings/saim/card";
import SaimDialog from "@/src/components/settings/saim/dialog";
import { Select } from "@mantine/core";
import Header from "@/src/components/settings/header";
import useSaims, {
  useSaimsCategory,
  useSaimsPage,
} from "@/src/services/saim/service";
import Category from "@/src/models/category";
import Settings from "@/src/components/validate/settings";
import NotFound from "@/src/components/validate/notFound";

export default function Page() {
  const [data, setData] = useState<Saim[]>([]);
  const [filteredData, setFilteredData] = useState<Saim[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [filterSaims, setFilterSaims] = useState([]);
  const [total, setTotal] = useState(0);

  const handleOpen = () => {
    setOpen(!open);
  };

  const update = () => {
    setRefresh(!refresh);
  };
  const { data: d, refetch } = useSaims();
  useEffect(() => {
    setData(d);
    setTotal(d?.length);
  }, [d]);

  const pagination = useSaimsPage();

  useEffect(() => {
    refetch().then((res) => {
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
    setTotal(filteredBySearch?.length);
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

  const handleFilter = (selectedCategory: string | null) => {
    const statusToFilter = status || "active";
    const categoryToFilter = selectedCategory || "Todos";

    if (categoryToFilter.toLowerCase() == "todos") {
      const SaimByCategory = data.filter(
        (saim) => saim.status.toLowerCase() === statusToFilter.toLowerCase()
      );
      setCategory(categoryToFilter);
      setFilteredData(SaimByCategory);
      setTotal(SaimByCategory?.length);
    } else {
      const SaimByCategory = data.filter(
        (saim) =>
          saim.category.name.toLowerCase() === categoryToFilter.toLowerCase() &&
          saim.status.toLowerCase() === statusToFilter.toLowerCase()
      );
      setCategory(categoryToFilter);
      setFilteredData(SaimByCategory);
      setTotal(SaimByCategory?.length);
    }
  };

  const handleStatus = (selectedStatus: string | null) => {
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
    setFilteredData(SaimByStatus);
    setTotal(SaimByStatus?.length);
  };

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  //
  const isVisible = filterOpen ? "visible" : "hidden";
  return (
    <>
      <Settings permissionsList={["create:saim", "update:saim", "delete:saim"]}>
        <div>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Header
              title="Gestión de Alertas Comerciales"
              message="Tu centro de operaciones personal para alertas comerciales. Agrega, edita y oculta información clave al instante. Toma el control de tus alertas."
            />
            <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row ">
              <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
                Cantidad de alertas comerciales: {total}
              </div>
              <div className="flex flex-col justify-end w-full h-full space-y-2 sm:w-8/12 sm:space-y-0 sm:space-x-8 sm:flex-row sm:flex-wrap">
                <button
                  onClick={handleOpen}
                  className={
                    total === 0
                      ? `flex items-center justify-center w-full h-10 text-white duration-100 rounded-lg sm:rounded-full shadow-none bg-navy sm:w-52`
                      : `flex items-center justify-center w-full h-10 text-white duration-100 rounded-lg shadow-none bg-navy sm:w-52 sm:hidden`
                  }
                >
                  Crear alerta comercial
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
                  className={`text-navy flex flex-row justify-center items-center space-x-2 w-full sm:w-44 h-10 text-center bg-white rounded-lg sm:rounded-full hover:shadow-lg font-semibold duration-300 hover:text-navy/80 border-2 border-navy`}
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
                  data={filterSaims}
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
                  data={statusSaims}
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
            {filteredData?.length === 0 ? (
              <NotFound />
            ) : (
              <>
                <div className="grid w-full h-full grid-cols-1 gap-10 px-8 py-4 pt-10 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    className="hidden sm:flex items-center justify-center w-full duration-300 border-2 border-black border-dashed cursor-pointer h-[28rem] rounded-3xl hover:bg-gray-200"
                    onClick={handleOpen}
                  >
                    <PlusIcon className="w-16 h-16 text-black" />
                  </button>
                  {filteredData?.map((saim) => {
                    return <SCard key={saim.id} data={saim} update={update} />;
                  })}
                </div>
              </>
            )}

            <SaimDialog open={open} handleOpen={handleOpen} update={update} />
          </div>
        </div>
      </Settings>
    </>
  );
}

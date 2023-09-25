"use client";
import Saim from "@/src/models/saim";
import getAllSaim from "@/src/services/saim/useSaims";
import { useCallback, useState, useEffect } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from "@heroicons/react/24/solid";
import SCard from "@/src/components/settings/saim/card";
import SaimDialog from "@/src/components/saim/Settings/saimDialog";
import React from "react";
import { useAtom } from "jotai";
import useSaims from "@/src/services/saim/useSaims";
import { saimAtom } from "@/src/state/states";
import SettingsFeed from "@/src/components/saim/Settings/settingsFeed";
import { useSaimsPage } from "@/src/services/saim/useSaimsPage";
import { Select } from "@mantine/core";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { set } from "date-fns";
import { ca } from "date-fns/locale";

export default function Page() {
  const [data, setData] = useState<Saim[]>([]);
  const [filteredData, setFilteredData] = useState<Saim[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [status, setStatus] = useState("");
  
  const handleOpen = () => {
    setOpen(!open);
  };

  const updateSaims = () => {
    setRefresh(!refresh);
  }
  const {data: d, refetch} = useSaims();
  useEffect(() => {
    setData(d);
  },[d])

  const pagination = useSaimsPage();

  useEffect(() => {
    refetch().then((res) => {
      setData(res.data);
    });
    pagination.refetch();
  }, [refresh])

  useEffect(() => {
    setFilteredData(data);
  },[]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterData = () => {
    const filteredByCategory =
      category === "Todos"
        ? data
        : data.filter(
            (saim) => saim.category.toLowerCase() === category.toLowerCase()
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

  const filterSaims = ["Todos", "Oportunidades", "Actualizaciones", "Amenazas", "Obstáculos"] 
  const statusSaims = [{label:"Publicados", value:"active"}, {label:"Ocultos", value:"deleted"}]

  const handleFilter = (selectedCategory: string) => {
    if(selectedCategory.toLowerCase() == "todos"){
      const SaimByCategory = data.filter(
        (saim) => saim.status.toLowerCase() === status.toLowerCase()
      );
      setCategory(selectedCategory);
      return setFilteredData(SaimByCategory);
    }else{
      const SaimByCategory = data.filter(
        (saim) => saim.category.toLowerCase() === selectedCategory.toLowerCase() && saim.status.toLowerCase() === status.toLowerCase()
      );
      console.log(status)
      console.log(SaimByCategory)
      setCategory(selectedCategory);
      setFilteredData(SaimByCategory);
    }
  };

  const handleStatus = (selectedStatus: string) => {
    const SaimByStatus = category !== "Todos" ? data.filter(
      (saim) => (saim.status.toLowerCase() === selectedStatus.toLowerCase() && saim.category.toLowerCase() === category.toLowerCase())
    ) : data.filter((saim) => (saim.status.toLowerCase() === selectedStatus.toLowerCase()));
    setStatus(selectedStatus);
    console.log(SaimByStatus)
    setFilteredData(SaimByStatus);
    console.log(filteredData)
  }

  const handleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  }

  const isVisible = filterOpen ? "visible" : "hidden";
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full h-[26rem] bg-gradient-to-tr from-purple-500 from-[15%] via-sky-600 to-sky-400 flex flex-col justify-center items-center space-y-6">
          <div className="text-5xl font-bold text-white">Gestión de Alertas Comerciales</div>
          <div className="w-6/12 text-xl font-thin text-center text-white">Tu centro de operaciones personal para alertas comerciales. Agrega, edita y oculta información clave al instante. Toma el control de tus alertas.</div>
        </div>
        <div className="w-full h-16">
        <div className="flex flex-row justify-end w-full h-full p-8 space-x-8">
          <input type="text" 
          className="w-56 h-10 px-5 rounded-full ring-2 ring-gray-300"
          placeholder="Buscar..."
          onChange={handleSearchChange}/>

        <Button onClick={handleFilterOpen}
        className="flex items-center h-10 gap-3 text-black duration-100 bg-white rounded-full shadow-none ring-gray-300 ring-2 hover:ring hover:shadow-none w-36">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          Filtrar
        </Button>
          </div>
        </div>
        
      <div className={`${isVisible} flex flex-row w-full px-8 pt-8 pb-4 space-x-8 justify-end`}>
        <div className="flex flex-col w-2/12 space-y-2">
          <label className="">Categorías</label>
        <Select
          className="w-full"
          size="md"
          radius="md"
          data={filterSaims}
          defaultValue="Todos"
          searchable={false}
          onChange={(e:string) => handleFilter(e)}
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
            onChange={(e:string) => handleStatus(e)}
          />
          </div>
          <div className="flex items-end justify-end">
            <button className="flex items-center justify-center w-10 h-10 text-white duration-300 bg-red-600 rounded-lg hover:bg-red-700"
            onClick={() => {
              setFilterOpen(false);
              setCategory("Todos");
              setStatus("");
              setSearch("");
            }}>
              <XMarkIcon className="w-6 h-6 text-white"/>
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
          {search === "" && category === "Todos" ? (
            <SettingsFeed queryI={pagination} updateSaims={updateSaims}/>
          ) : (
            filteredData?.map((saim) => {
              return (
                  <SCard key={saim.id} data={saim} updateSaims={updateSaims} />
              );
            })
          )}
        </div>
        <SaimDialog
          open={open}
          handleOpen={handleOpen}
          updateSaims={updateSaims}
        />
      </div>
    </div>
  );
}

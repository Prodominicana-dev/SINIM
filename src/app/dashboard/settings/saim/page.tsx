"use client";
import Saim from "@/src/models/saim";
import getAllSaim from "@/src/services/saim/useSaims";
import { useCallback, useState, useEffect } from "react";
import {
  Input,
} from "@material-tailwind/react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import SCard from "@/src/components/settings/saim/card";
import SaimDialog from "@/src/components/saim/Settings/saimDialog";
import React from "react";
import { useAtom } from "jotai";
import useSaims from "@/src/services/saim/useSaims";
import { saimAtom } from "@/src/state/states";
import SettingsFeed from "@/src/components/saim/Settings/settingsFeed";
import { useSaimsPage } from "@/src/services/saim/useSaimsPage";

export default function Page() {
  const [data, setData] = useState<Saim[]>([]);
  const [filteredData, setFilteredData] = useState<Saim[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [open, setOpen] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  
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

    const filteredBySearch = filteredByCategory.filter(
      (saim) =>
        saim.title.toLowerCase().includes(search.toLowerCase()) ||
        saim.products.some(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.code.toLowerCase().includes(search.toLowerCase())
        )
    );

    setFilteredData(filteredBySearch);
  };

  useEffect(() => {
    filterData();
  }, [search, category]);

  const filterSaims = ["Todos", "Oportunidades", "Actualizaciones", "Amenazas", "Obstáculos"] 

  const handleFilter = (selectedCategory: string) => {
    // Filtrar datos por categoría y actualizar el estado
    const SaimByCategory = data.filter(
      (saim) => saim.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setCategory(selectedCategory);
    selectedCategory.toLowerCase() == "todos"
      ? setFilteredData(data)
      : setFilteredData(SaimByCategory);
  };
  
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-row flex-wrap items-center justify-center w-11/12 lg:w-8/12 lg:justify-between">
          {filterSaims.map((filter) => (
            <button
            onClick={() => handleFilter(filter)}
            className={category === filter ? 
              "h-12 duration-300 border-2 bg-navy/90 text-white rounded-full cursor-pointer w-32 lg:w-44 m-2" : 
              "h-12 duration-300 border-2 border-black rounded-full cursor-pointer lg:w-44 hover:bg-gray-200 w-32 m-2"}
          >
            {filter}
          </button>
          ))}
        </div>
        <div className="flex justify-end w-full pt-8 pr-8">
          <div className="w-3/12 h-14">
            <Input icon={<MagnifyingGlassIcon  />} variant="standard" placeholder="Buscar..." crossOrigin={""}
            onChange={handleSearchChange}   />
          </div>
        </div>
        {/* 
               SAIMS
            */}
        <div className="grid w-full h-full grid-cols-1 gap-10 p-8 sm:grid-cols-2 lg:grid-cols-4 ">
          <button
            className="flex items-center justify-center w-full h-full duration-300 border-2 border-black border-dashed cursor-pointer rounded-3xl hover:bg-gray-200"
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

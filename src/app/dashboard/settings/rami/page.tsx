"use client";

import { ramiAtom } from "@/src/state/states";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Card from "@/src/components/settings/rami/card";
import Header from "@/src/components/settings/header";
import RamiDialog from "@/src/components/settings/rami/dialogEdit";
import {useRamisSettings} from "@/src/services/ramis/service";
import country from "@/src/models/country";
import { nfd } from "unorm";
import RamiEditDialog from "@/src/components/settings/rami/dialogEdit";
import RamiCreateDialog from "@/src/components/settings/rami/dialogCreate";

export default function Page() {
  const { data, isLoading, isError, refetch } = useRamisSettings();
  const [ramis, setRamis] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [nextButton, setNextButton] = useState(false);
  const [prevButton, setPrevButton] = useState(true);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(
    (currentPage - 1) * itemsPerPage
  );
  const [endIndex] = useState(currentPage * itemsPerPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage < ramis.length / itemsPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (search) {
      const filteredRamis = ramis.filter((rami) => {
        const productName = nfd(rami.product.name.toLowerCase());
        const productCode = nfd(rami.product.code.toLowerCase());
        const countryName = nfd(rami.country.name.toLowerCase());
        const _search = search.toLowerCase();
        return (
          productName.includes(_search) ||
          productCode.includes(_search) ||
          countryName.includes(_search)
        );
      });
      const filteredTotalPages = Math.ceil(filteredRamis.length / itemsPerPage);
      setTotalPages(filteredTotalPages);
      if (currentPage > filteredTotalPages) {
        setCurrentPage(1);
      }
      return setCurrentPageData(filteredRamis?.slice(startIndex, endIndex));
    }
    const normalTotalPages = Math.ceil(ramis?.length / itemsPerPage);
    setTotalPages(normalTotalPages);
    setCurrentPageData(ramis?.slice(startIndex, endIndex));
  }, [ramis, data, currentPage, search]);

  useEffect(() => {
    setRamis(data);
  }, [data]);

  useEffect(() => {
    refetch().then((res) => {
      setRamis(res.data);
    });
  }, [refresh, refetch]);

  useEffect(() => {
    setStartIndex((currentPage - 1) * itemsPerPage);
    const endIndex = startIndex + itemsPerPage;
    setCurrentPageData(ramis?.slice(startIndex, endIndex));
  }, [ramis, currentPage]);

  const updateRamis = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    setRamis(data);
  }, [data]);

  return (
    <>
      <Header
        title="Gestión de los RAMI"
        message="Tu centro de operaciones personal para los RAMI. Agrega, edita y oculta información clave al instante. Toma el control de tus RAMIS."
      />
      <div className="w-full h-16">
        <div className="flex flex-row flex-wrap justify-end w-full h-full p-8 space-x-8">
          <button
            onClick={handleOpen}
            className={`text-white w-44 text-center bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
          >
            Crear RAMI
          </button>
          <input
            type="text"
            className="h-10 px-5 rounded-full w-72 ring-2 ring-gray-300"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full p-8 space-y-5">
        <div className="grid items-center justify-between w-full h-24 grid-cols-4 p-5 font-bold text-center bg-white rounded-lg ring-2 ring-gray-100">
          <div className="text-center">Producto</div>
          <div>Código</div>
          <div className="cursor-pointer" onClick={() => {}}>
            País
          </div>
          <div>Acción</div>
        </div>

        {currentPageData?.map((rami: any, key: number) => {
          return <Card key={key} rami={rami} updateRamis={updateRamis} />;
        })}

        <div className="flex flex-row items-center justify-end w-full py-4 space-x-3">
          <button
            className={`text-black w-32 h-8 text-center bg-gray-300 rounded-lg`}
            disabled={currentPage === 1 ? true : false}
            onClick={prevPage}
          >
            Anterior
          </button>
          <div className="flex items-center justify-center w-12 h-12 text-black bg-white rounded-full ring-1 ring-gray-300">
            {currentPage}/{totalPages}
          </div>
          <button
            className={`text-black w-32 h-8 text-center bg-gray-300 rounded-lg`}
            disabled={currentPage === totalPages ? true : false}
            onClick={nextPage}
          >
            Siguiente
          </button>
        </div>
      </div>
      {open ? (
        <RamiCreateDialog
          open={open}
          handleOpen={handleOpen}
          updateRami={updateRamis}
          title={"Crear RAMI"}
        />
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Header from "@/src/components/settings/header";
import { useAllDataMarkets } from "@/src/services/datamarket/service";
import { nfd } from "unorm";
import Card from "@/src/components/settings/datamarket/card";
import DatamarketDialog from "@/src/components/settings/datamarket/dialog";
import Datamarket from "@/src/models/datamarket";

export default function Page() {
  const { data, isLoading, isError, refetch } = useAllDataMarkets();
  const [datamarket, setDatamarket] = useState<Datamarket[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [nextButton, setNextButton] = useState(false);
  const [prevButton, setPrevButton] = useState(true);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage < datamarket.length / itemsPerPage) {
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
      const filteredDatamarkets = datamarket.filter((datamarket) => {
        const title = nfd(datamarket.title.toLowerCase());
        const url = nfd(datamarket.url.toLowerCase());
        const _search = search.toLowerCase();
        return title.includes(_search) || url.includes(_search);
      });
      const filteredTotalPages = Math.ceil(
        filteredDatamarkets.length / itemsPerPage
      );
      setTotalPages(filteredTotalPages);
      if (currentPage > filteredTotalPages) {
        setCurrentPage(1);
      }
      return setCurrentPageData(
        filteredDatamarkets?.slice(startIndex, endIndex)
      );
    }
    const normalTotalPages = Math.ceil(datamarket?.length / itemsPerPage);
    setTotalPages(normalTotalPages);
    setCurrentPageData(datamarket?.slice(startIndex, endIndex));
  }, [datamarket, data, currentPage, search]);

  useEffect(() => {
    setDatamarket(data);
  }, [data]);

  //const pagination = useSaimsPage();

  useEffect(() => {
    refetch().then((res) => {
      setDatamarket(res.data);
    });
    //pagination.refetch();
  }, [refresh, refetch]);

  const updateDatamarkets = () => {
    setRefresh(!refresh);
  };
  return (
    <>
      <Header
        title="Gestión de Datamarket"
        message="Tu centro de operaciones personal para Datamarket. Agrega, edita y oculta información clave al instante. Toma el control de tus Datamarket."
      />
      <div className="w-full h-16">
        <div className="flex flex-row flex-wrap justify-end w-full h-full p-8 space-x-8">
          <button
            onClick={handleOpen}
            className={`text-white w-44 text-center bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
          >
            Crear Datamarket
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
          <div className="text-center">Título</div>
          <div>Url</div>
          <div>Estado</div>
          <div>Acción</div>
        </div>

        {currentPageData?.map((datamarket: any, key: number) => {
          return (
            <Card
              key={key}
              datamarket={datamarket}
              updateDatamarkets={updateDatamarkets}
            />
          );
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
        <DatamarketDialog
          open={open}
          handleOpen={handleOpen}
          updateDatamarkets={updateDatamarkets}
        />
      ) : null}
    </>
  );
}

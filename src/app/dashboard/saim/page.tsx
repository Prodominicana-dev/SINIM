"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, ChangeEvent } from "react";
import SaimCard from "../../../components/saim/card";
import Saim from "@/src/models/saim";
import Feed from "@/src/components/saim/feed";
import { useActiveSaims } from "@/src/services/saim/service";
import NotFound from "@/src/components/validate/notFound";
import { Spinner } from "@material-tailwind/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";

export default function Page() {
  const saimFilters = [
    {
      name: "Todos",
      title: "¡Explora todas nuestras alertas!",
      description:
        "Bienvenido a la sección de Alertas Comerciales del SINIM, donde los exportadores encontrarán una amplia gama de información acerca de las oportunidades, tendencias y desafíos del comercio internacional.",
    },
    {
      name: "Oportunidades",
      title: "Descubra nuevas oportunidades de negocio",
      description:
        "Explore oportunidades emergentes, tendencias y nichos de mercado que pueden impulsar su crecimiento internacional.",
    },
    {
      name: "Actualizaciones",
      title: "Explore las novedades más recientes en su industria",
      description:
        "Potencie su competitividad al mantenerse actualizado en las regulaciones, políticas y tendencias del comercio internacional.",
    },
    {
      name: "Amenazas",
      title: "Esté al pendiente de las amenazas potenciales",
      description:
        "Manténgase al tanto de las amenazas potenciales y tome medidas preventivas para garantizar la seguridad y el éxito de sus exportaciones. ",
    },
    {
      name: "Obstáculos",
      title: "Eluda los obstáculos presentes en el comercio global",
      description:
        "Acceda a los obstáculos identificados en los mercados internacionales, manteniéndose informado acerca de los desafíos que pueden impactar sus objetivos comerciales.",
    },
  ];
  const { data: dataSaim } = useActiveSaims();
  const [data, setData] = useState<Saim[]>([]);
  const [filteredData, setFilteredData] = useState<Saim[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(saimFilters[0].name);
  const [categoryTitle, setCategoryTitle] = useState(saimFilters[0].title);
  const [categoryDescription, setCategoryDescription] = useState(
    saimFilters[0].description
  );
  const { user, isLoading: isUserLoading } = useUser();
  const [canSeeSaims, setCanSeeSaims] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("saim") &&
      localStorage.getItem("saim") === "true"
    ) {
      setCanSeeSaims(true);
    } else {
      setCanSeeSaims(false);
    }
  }, [user, isUserLoading]);

  useEffect(() => {
    setData(dataSaim);
  }, [dataSaim]);

  useEffect(() => {
    if (!data) return;
    if (!canSeeSaims && !isUserLoading) {
      const publicData: Saim[] = data
        ?.map((saim: Saim | null) => (saim && saim.isPublic ? saim : null))
        .filter(Boolean) as Saim[];
      return setFilteredData(publicData);
    }
    setFilteredData(data);
  }, [data, canSeeSaims, isUserLoading]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (selectedCategory: string) => {
    // Filtrar datos por categoría y actualizar el estado
    const SaimByCategory = data.filter(
      (saim: Saim) =>
        saim.category.name.toLowerCase() === selectedCategory.toLowerCase()
    );

    const selectedFilter = saimFilters.find(
      (filter) => filter.name.toLowerCase() === selectedCategory.toLowerCase()
    );

    if (selectedFilter) {
      setCategoryTitle(selectedFilter.title);
      setCategoryDescription(selectedFilter.description);
    }
    setCategory(selectedCategory);
    selectedCategory.toLowerCase() == "todos"
      ? setFilteredData(data)
      : setFilteredData(SaimByCategory);
  };

  const filterData = () => {
    const filteredByCategory =
      category === "Todos"
        ? data
        : data?.filter(
            (saim: Saim) =>
              saim.category.name.toLowerCase() === category.toLowerCase()
          );

    const filteredBySearch = filteredByCategory?.filter(
      (saim: Saim) =>
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

  if (isUserLoading)
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="w-full h-full">
      <div className="relative w-full sm:h-4/6">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="object-cover w-full h-full"
            src="/videos/rami.mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-black border-0 opacity-60"></div>
        <div className="relative flex flex-col items-center justify-center w-full h-full px-5 sm:px-0">
          <div className="gap-3 sm:gap-5 lg:gap-10 my-10 text-[14px] sm:text-lg flex flex-row justify-center items-center flex-wrap lg:flex-nowrap sm:w-8/12">
            {saimFilters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => handleFilter(filter.name)}
                className={`${
                  category === filter.name
                    ? "bg-white text-black font-bold"
                    : "bg-black/50 text-white hover:bg-white hover:text-black"
                } rounded-full p-3 sm:p-4 cursor-pointer text-center duration-200`}
              >
                {filter.name}
              </button>
            ))}
          </div>
          <div className="text-2xl font-bold text-center text-white sm:w-8/12 md:w-6/12 xl:w-4/12 sm:text-3xl">
            {categoryTitle}
          </div>
          <div className="mt-4 text-sm text-center text-white sm:w-8/12 md:w-6/12 xl:w-4/12 sm:text-normal">
            {categoryDescription}
          </div>
          <div className="flex flex-row w-10/12 p-4 my-10 bg-white rounded-full sm:p-5 sm:w-8/12 md:w-6/12 xl:w-4/12">
            <MagnifyingGlassIcon className="w-5 mx-2 text-gray-500" />
            <input
              placeholder="Buscar..."
              className="w-10/12 text-blue-500 bg-white outline-none"
              name="search"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      {search === "" && category === "Todos" ? (
        <Feed />
      ) : (
        <>
          {filteredData?.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredData?.map((saim) =>
                  canSeeSaims ? (
                    <div key={saim.id}>
                      <SaimCard {...saim} />
                    </div>
                  ) : saim.isPublic ? (
                    <div key={saim.id}>
                      <SaimCard {...saim} />
                    </div>
                  ) : null
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

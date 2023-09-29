"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import SaimCard from "../../../components/saim/card";
import Saim from "@/src/models/saim";
import Feed from "@/src/components/saim/feed";
import { useAtom } from "jotai";
import { saimAtom } from "@/src/state/states";

export default function Page() {
  const saimFilters = [
    {
      name: "Todos",
      title: "¡Explora Todas Nuestras Alertas!",
      description:
        "Bienvenido a la sección de alertas para exportadores en diversos mercados. Aquí encontrarás una amplia gama de información valiosa para ayudarte a navegar por los desafíos y oportunidades del comercio internacional. ¡Sumérgete en nuestras alertas y mantente al tanto de lo que está sucediendo en el mundo del comercio exterior!",
    },
    {
      name: "Oportunidades",
      title: "Descubra Nuevas Oportunidades de Negocio",
      description:
        "Explore oportunidades emergentes, tendencias y nichos de mercado que pueden impulsar su crecimiento empresarial.",
    },
    {
      name: "Actualizaciones",
      title: "Explore las Novedades más Recientes en su Industria",
      description:
        "Mantenga una ventaja competitiva al estar informado sobre las últimas actualizaciones en regulaciones, políticas y tendencias relevantes para su industria.",
    },
    {
      name: "Amenazas",
      title: "Esté al Pendiente de las Amenazas Potenciales",
      description:
        "Manténgase al tanto de las amenazas potenciales y tome medidas preventivas para garantizar la seguridad y el éxito de su empresa. ",
    },
    {
      name: "Obstáculos",
      title: "Descubra Estrategias para Sortear los Obstáculos",
      description:
        "Aprenda a eludir obstáculos y encontrar atajos inteligentes en su búsqueda hacia el logro de sus objetivos.",
    },
  ];
  const [data, setData] = useAtom(saimAtom);
  const [filteredData, setFilteredData] = useState<Saim[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(saimFilters[0].name);
  const [categoryTitle, setCategoryTitle] = useState(saimFilters[0].title);
  const [categoryDescription, setCategoryDescription] = useState(
    saimFilters[0].description
  );

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (selectedCategory: string) => {
    // Filtrar datos por categoría y actualizar el estado
    const SaimByCategory = data.filter(
      (saim) => saim.category.toLowerCase() === selectedCategory.toLowerCase()
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
            typeof="video/mp4"
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
              className="w-10/12 text-blue-500 outline-none"
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
        <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredData?.map((saim) => {
            return (
              <div key={saim.id}>
                <SaimCard {...saim} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

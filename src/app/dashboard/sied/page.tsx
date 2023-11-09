"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, ChangeEvent } from "react";
import Sied from "@/src/models/sied";
import Feed from "@/src/components/sied/feed";
import SiedCard from "@/src/components/sied/card";
import { useActiveSieds } from "@/src/services/sied/service";
import NotFound from "@/src/components/validate/notFound";
import { Spinner } from "@material-tailwind/react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
  const iedFilters = [
    {
      name: "Todas",
      title: "¡Explora todas nuestras alertas de IED!",
      description:
        "Bienvenido a la sección de Alertas de Inversión Extranjera Directa (IED), donde los inversores encontrarán información valiosa sobre oportunidades, tendencias, normativas y amenazas en el ámbito de la inversión extranjera.",
    },
    {
      name: "Oportunidades",
      title: "Descubre nuevas oportunidades de inversión",
      description:
        "Explora oportunidades emergentes, tendencias y nichos de mercado que pueden impulsar tu inversión extranjera directa.",
    },
    {
      name: "Normativas",
      title: "Mantente al día con las normativas en IED",
      description:
        "Potencia tu conocimiento al mantenerse actualizado sobre regulaciones, políticas y tendencias en el ámbito de la inversión extranjera directa.",
    },
    {
      name: "Amenazas",
      title: "Identifica amenazas potenciales en la IED",
      description:
        "Mantente informado sobre las amenazas potenciales y toma medidas preventivas para asegurar el éxito de tu inversión extranjera directa.",
    },
    {
      name: "Tendencias",
      title: "Explora las tendencias en IED por región",
      description:
        "Accede a información detallada sobre las tendencias de inversión extranjera directa en diferentes regiones del mundo, identificando oportunidades y desafíos emergentes.",
    },
  ];

  const { data, isLoading, isError } = useActiveSieds();
  const [filteredData, setFilteredData] = useState<Sied[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(iedFilters[0].name);
  const [categoryTitle, setCategoryTitle] = useState(iedFilters[0].title);
  const [categoryDescription, setCategoryDescription] = useState(
    iedFilters[0].description
  );
  const { user, isLoading: isUserLoading } = useUser();

  const [canSeeSieds, setCanSeeSieds] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("sied") &&
      localStorage.getItem("sied") === "true"
    ) {
      setCanSeeSieds(true);
    } else {
      setCanSeeSieds(false);
    }
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilter = (selectedCategory: string) => {
    // Filtrar datos por categoría y actualizar el estado
    const SiedByCategory = data.filter(
      (sied: Sied) =>
        sied.category.name.toLowerCase() === selectedCategory.toLowerCase()
    );

    const selectedFilter = iedFilters.find(
      (filter) => filter.name.toLowerCase() === selectedCategory.toLowerCase()
    );

    if (selectedFilter) {
      setCategoryTitle(selectedFilter.title);
      setCategoryDescription(selectedFilter.description);
    }
    setCategory(selectedCategory);
    selectedCategory.toLowerCase() == "todos"
      ? setFilteredData(data)
      : setFilteredData(SiedByCategory);
  };

  const filterData = () => {
    const filteredByCategory =
      category === "Todos"
        ? data
        : data?.filter(
            (sied: Sied) =>
              sied.category.name.toLowerCase() === category.toLowerCase()
          );

    const filteredBySearch = filteredByCategory?.filter(
      (sied: Sied) =>
        sied.title.toLowerCase().includes(search.toLowerCase()) ||
        sied.category.name.toLowerCase().includes(search.toLowerCase())
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
            src="/videos/charts.mp4"
            typeof="video/mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-black border-0 opacity-60"></div>
        <div className="relative flex flex-col items-center justify-center w-full h-full px-5 sm:px-0">
          <div className="gap-3 sm:gap-5 lg:gap-10 my-10 text-[14px] sm:text-lg flex flex-row justify-center items-center flex-wrap lg:flex-nowrap sm:w-8/12">
            {iedFilters.map((filter) => (
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
                {filteredData?.map((sied) =>
                  canSeeSieds ? (
                    <div key={sied.id}>
                      <SiedCard {...sied} />
                    </div>
                  ) : sied.isPublic ? (
                    <div key={sied.id}>
                      <SiedCard {...sied} />
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

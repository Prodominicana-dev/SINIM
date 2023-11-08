"use client";
import { Select } from "@mantine/core";
import Card from "@/src/components/post/card";
import { usePosts } from "@/src/services/post/service";
import Post from "@/src/models/post";
import { useEffect, useState } from "react";
import NotFound from "@/src/components/validate/notFound";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { data, isLoading, isError } = usePosts();

  useEffect(() => {
    if (!isLoading) {
      console.log(data);
      setPosts(filteredPosts());
      setCategories(data.categories);
      setTypes(data.types);
      setLanguages(data.languages);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (data) {
      setPosts(filteredPosts());
    }
  }, [selectedCategory, selectedLanguage, selectedType]);

  const filteredPosts = () => {
    let filtered = data.posts;

    if (selectedCategory) {
      filtered = filtered.filter(
        (post: any) => post.category === selectedCategory
      );
    }

    if (selectedType) {
      filtered = filtered.filter((post: any) => post.type === selectedType);
    }

    if (selectedLanguage) {
      filtered = filtered.filter(
        (post: any) => post.language === selectedLanguage
      );
    }

    return filtered;
  };

  const uniqueTypes = (filteredData: any) =>
    filteredData.reduce((types: any, post: any) => {
      if (!types.includes(post.type)) {
        types.push(post.type);
      }
      return types;
    }, []);

  const uniqueCategories = (filteredData: any) =>
    filteredData.reduce((categories: any, post: any) => {
      if (!categories.includes(post.category)) {
        categories.push(post.category);
      }
      return categories;
    }, []);

  const uniqueLanguages = (filteredData: any) =>
    filteredData.reduce((languages: any, post: any) => {
      if (!languages.includes(post.language)) {
        languages.push(post.language);
      }
      return languages;
    }, []);

  const handleCategoryChange = (value: any) => {
    setSelectedCategory(value);
    const filteredData = data.posts.filter(
      (post: any) => post.category === value
    );
    setTypes(uniqueTypes(filteredData));
    setLanguages(uniqueLanguages(filteredData));
  };

  const handleTypeChange = (value: any) => {
    setSelectedType(value);
    const filteredData = data.posts.filter((post: any) => post.type === value);
    setCategories(uniqueCategories(filteredData));
    setLanguages(uniqueLanguages(filteredData));
  };

  const handleLanguageChange = (value: any) => {
    setSelectedLanguage(value);
    const filteredData = data.posts.filter(
      (post: any) => post.language === value
    );
    setCategories(uniqueCategories(filteredData));
    setTypes(uniqueTypes(filteredData));
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
    setSelectedLanguage("");
    setCategories(data.categories);
    setTypes(data.types);
    setLanguages(data.languages);
  };

  return (
    <div className="w-full h-full">
      <div className="relative w-full h-[60vh] sm:h-[50vh]">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            src="/videos/datamarket.mp4"
            typeof="video/mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-700/80 to-sky-500/80  border-0"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-5 sm:px-0 w-full">
          <div className="w-10/12 sm:w-8/12 lg:w-6/12 xl:w-4/12 text-center text-white text-4xl sm:text-5xl font-bold">
            Explora nuestras publicaciones
          </div>
          <div className="w-10/12 sm:w-8/12 lg:w-6/12 xl:w-4/12 mt-4 text-center text-white text-xs sm:text-sm">
            Descubre documentos relacionados con inversión y exportación y
            utiliza nuestros filtros para encontrar exactamente lo que
            necesitas.
          </div>
          <div className="sm:flex my-5 sm:w-8/12 lg:w-6/12 xl:w-5/12 space-y-5 sm:space-y-0 sm:space-x-5">
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              placeholder="Categoria"
              data={categories ? categories : []}
              searchable
              clearable
              nothingFoundMessage="Nothing found..."
              value={selectedCategory}
              onChange={handleCategoryChange}
            />
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              placeholder="Tipo"
              data={types ? types : []}
              searchable
              clearable
              nothingFoundMessage="Nothing found..."
              value={selectedType}
              onChange={handleTypeChange}
            />
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              placeholder="Idioma"
              clearable
              data={languages ? languages : []}
              searchable
              value={selectedLanguage}
              nothingFoundMessage="Nothing found..."
              onChange={handleLanguageChange}
            />
            {selectedCategory || selectedType || selectedLanguage ? (
              <IconButton
                className="p-6 w-full bg-red-600 hover:bg-red-700 duration-700"
                onClick={handleClearFilters}
              >
                <XMarkIcon className="w-8 text-white" />
              </IconButton>
            ) : null}
          </div>
        </div>
      </div>
      {posts ? (
        <div className="grid grid-cols-1 place-items-center gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {posts?.map((post: Post) => {
            return (
              <div key={post.id}>
                <Card {...post} />
              </div>
            );
          })}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

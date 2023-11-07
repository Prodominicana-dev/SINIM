"use client";
import { Select } from "@mantine/core";
import Card from "@/src/components/post/card";
import { usePosts } from "@/src/services/post/service";
import Post from "@/src/models/post";

export default function Page() {
  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = usePosts();
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
              rightSection={<></>}
              placeholder="Categoria"
              // data={productSelect ? productSelect : []}
              searchable
              nothingFoundMessage="Nothing found..."
              // onChange={handleProductChange}
            />
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              rightSection={<></>}
              placeholder="Tipo"
              // data={countriesSelect ? countriesSelect : []}
              searchable
              nothingFoundMessage="Nothing found..."
              // onChange={handleCountryChange}
            />
            <Select
              className="w-full"
              size={"lg"}
              radius="md"
              rightSection={<></>}
              placeholder="Idioma"
              // data={countriesSelect ? countriesSelect : []}
              searchable
              nothingFoundMessage="Nothing found..."
              // onChange={handleCountryChange}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 place-items-center gap-8 p-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {posts?.map((post: Post) => {
          return (
            <div key={post.id}>
              <Card {...post} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

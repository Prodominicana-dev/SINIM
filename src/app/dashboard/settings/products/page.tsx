"use client";
import React from "react";
import { useEffect, useState } from "react";
import Card from "@/src/components/settings/products/card";
import Header from "@/src/components/settings/header";
import Product from "@/src/models/product";
import ProductDialog from "@/src/components/settings/products/dialog";
import { useAllProducts } from "@/src/services/products/service";
import { nfd } from "unorm";
import Settings from "@/src/components/validate/settings";
import NotFound from "@/src/components/validate/notFound";

export default function Page() {
  const { data, refetch } = useAllProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [total, setTotal] = useState(0);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const [totalPages, setTotalPages] = useState(
    Math.ceil(data?.length / itemsPerPage)
  );

  const nextPage = () => {
    if (currentPage < products.length / itemsPerPage) {
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
      const filteredProducts = products.filter((product) => {
        const name = nfd(product.name.toLowerCase());
        const code = nfd(product.code.toLowerCase());
        const _search = search.toLowerCase();
        return name.includes(_search) || code.includes(_search);
      });
      const filteredTotalPages = Math.ceil(
        filteredProducts.length / itemsPerPage
      );
      setTotalPages(filteredTotalPages);
      setTotal(filteredProducts?.length);
      if (currentPage > filteredTotalPages) {
        setCurrentPage(1);
      }
      return setCurrentPageData(filteredProducts?.slice(startIndex, endIndex));
    }
    const normalTotalPages = Math.ceil(products?.length / itemsPerPage);
    setTotalPages(normalTotalPages);
    setTotal(products?.length);
    setCurrentPageData(products?.slice(startIndex, endIndex));
  }, [products, data, currentPage, search]);

  useEffect(() => {
    setProducts(data);
    setTotal(data?.length);
  }, [data]);

  //const pagination = useSaimsPage();

  useEffect(() => {
    refetch().then((res) => {
      setProducts(res.data);
      setTotal(res.data?.length);
    });
    //pagination.refetch();
  }, [refresh, refetch]);

  const updateProducts = () => {
    setRefresh(!refresh);
  };

  //

  return (
    <>
      <Settings
        permissionsList={[
          "create:saim",
          "update:saim",
          "delete:saim",
          "create:ramis",
          "update:ramis",
          "delete:ramis",
        ]}
      >
        <Header
          title="Gestión de productos"
          message="Tu centro de operaciones personal para productos. Agrega, edita y oculta información clave al instante. Toma el control de tus productos."
        />
        <div className="flex flex-col w-full p-4 space-y-2 sm:p-8 sm:space-y-0 sm:flex-row">
          <div className="flex items-center justify-start w-full text-xl font-semibold text-center text-black sm:text-left sm:w-4/12">
            Cantidad de productos: {total}
          </div>
          <div className="flex flex-col justify-end w-full h-full space-y-2 sm:space-y-0 sm:space-x-8 sm:flex-wrap sm:flex-row">
            <button
              onClick={handleOpen}
              className={`text-white w-full sm:w-44 text-center h-10 bg-navy rounded-lg hover:shadow-lg font-semibold duration-300 hover:text-white/80`}
            >
              Crear Productos
            </button>
            <input
              type="text"
              className="w-full h-10 px-5 rounded-full sm:w-72 ring-2 ring-gray-300"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full p-4 space-y-5 sm:p-8">
          {currentPageData?.length === 0 ? (
            <NotFound />
          ) : (
            <>
              <div className="grid items-center justify-between w-full h-24 grid-cols-3 p-5 font-bold text-center bg-white rounded-lg sm:grid-cols-4 ring-2 ring-gray-100">
                <div className="text-center">Nombre</div>
                <div className="hidden sm:block">Código</div>
                <div>Estado</div>
                <div>Acción</div>
              </div>

              {currentPageData?.map((product: any, key: number) => {
                return (
                  <Card
                    key={key}
                    product={product}
                    updateProducts={updateProducts}
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
            </>
          )}
        </div>
        {open ? (
          <ProductDialog
            open={open}
            handleOpen={handleOpen}
            updateProducts={updateProducts}
          />
        ) : null}
      </Settings>
    </>
  );
}

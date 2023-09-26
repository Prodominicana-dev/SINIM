"use client";
import { countryAtom, productAtom, ramiAtom } from "@/src/state/states";
import { Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [countries, setCountries] = useAtom(countryAtom);
  const [products, setProducts] = useAtom(productAtom);
  const [ramis, setRamis] = useAtom(ramiAtom);
  const [countriesSelect, setCountriesSelect] = useState<any>([]);
  const [productSelect, setProductSelect] = useState<any>([]);
  const [originalCountriesSelect, setOriginalCountriesSelect] = useState<any>(
    []
  );
  const [originalProductSelect, setOriginalProductSelect] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (countries && ramis) {
      const countryidRamis = ramis.map((rami) => rami.countryId);

      const country = countries
        .filter((country) => countryidRamis.includes(country.id)) // Utiliza filter en lugar de map
        .map((country) => ({
          value: country.id.toString(),
          label: country.name,
        }));
      setOriginalCountriesSelect(country);
      setCountriesSelect(country);
    }
    if (products && ramis) {
      const productidRamis = ramis.map((rami) => rami.productId);
      const product = products
        .filter((product) => productidRamis.includes(product.id)) // Utiliza filter en lugar de map
        .map((product) => ({
          value: product.id.toString(),
          label: `${product.name} - ${product.code}`,
        }));
      setOriginalProductSelect(product);
      setProductSelect(product);
    }
  }, [ramis, countries, products]);

  // Función para manejar la selección de producto
  const handleProductChange = (value: any) => {
    if (!value) {
      console.log("entro");
      console.log(countriesSelect);
      setProductSelect(originalProductSelect);
      setCountriesSelect(originalCountriesSelect);
      setSelectedProduct(value);
      return;
    }
    setSelectedProduct(value);

    const countryidRamis = ramis
      .filter((rami) => rami.productId === Number(value))
      .map((rami) => rami.countryId);

    const countryOptions = countries
      .filter((country) => countryidRamis.includes(country.id))
      .map((country) => ({
        value: country.id.toString(),
        label: country.name,
      }));
    setCountriesSelect(countryOptions);
  };

  const handleCountryChange = (value: any) => {
    if (!value) {
      setProductSelect(originalProductSelect);
      setCountriesSelect(originalCountriesSelect);
      setSelectedCountry(value);
      return;
    }
    setSelectedCountry(value);

    // Filtrar los productos basados en los Rami que tienen el país seleccionado
    const productidRamis = ramis
      .filter((rami) => rami.countryId === Number(value))
      .map((rami) => rami.productId);

    console.log(productidRamis);

    const productOptions = products
      .filter((product) => productidRamis.includes(product.id))
      .map((product) => ({
        value: product.id.toString(),
        label: `${product.name} - ${product.code}`,
      }));
    setProductSelect(productOptions);
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    const rami = ramis.find(
      (rami) =>
        rami.productId === Number(selectedProduct) &&
        rami.countryId === Number(selectedCountry)
    );
    console.log(rami);
    if (rami) {
      router.push(`/dashboard/rami/${rami.id}`);
    }
  };
  return (
    <div className="w-full h-[90vh]">
      <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            src="/videos/connection.mp4"
            typeof="video/mp4"
          ></video>
        </div>
        <div className="absolute inset-0 bg-navy/50 border-0"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-5 sm:px-0 w-full">
          <div className="sm:w-8/12 lg:w-6/12 xl:w-4/12 text-center text-white text-5xl sm:text-5xl font-bold">
            ¿Ya sabes qué necesitas para exportar?
          </div>
          <div className="sm:w-8/12 lg:w-6/12 xl:w-4/12 mt-4 text-center text-white text-sm">
            Selecciona tu producto y el país de destino, y descubre al instante
            los requisitos específicos de exportación. Dando un salto seguro
            hacia el éxito internacional.
          </div>
          <div className="sm:flex my-5 sm:w-8/12 lg:w-6/12 xl:w-5/12 space-y-5 sm:space-y-0 sm:space-x-5">
            <Select
              className="w-full"
              size="xl"
              radius="md"
              rightSection={<></>}
              placeholder="Producto"
              data={productSelect ? productSelect : []}
              searchable
              nothingFoundMessage="Nothing found..."
              value={selectedProduct}
              onChange={handleProductChange}
            />
            <Select
              className="w-full"
              size="xl"
              radius="md"
              rightSection={<></>}
              placeholder="Pais"
              data={countriesSelect ? countriesSelect : []}
              searchable
              nothingFoundMessage="Nothing found..."
              value={selectedCountry}
              onChange={handleCountryChange}
            />
            <button
              {...(selectedCountry && selectedProduct
                ? {}
                : { disabled: true })}
              className={`flex justify-center items-center h-16 w-full sm:w-60 bg-navy text-white p-0 rounded-lg ${
                selectedCountry && selectedProduct
                  ? "hover:bg-navy/80"
                  : "cursor-not-allowed"
              }`}
              onClick={() => {
                handleSearch();
              }}
            >
              <IconSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

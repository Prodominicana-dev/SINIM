"use client";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import useSaims from "@/src/services/saim/useSaims";
import useCountries from "@/src/services/countries/useCountries";
import Saim from "@/src/models/saim";
import { useAtom } from "jotai";
import { useProducts } from "@/src/services/products/useProducts";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import '@mantine/notifications/styles.css';
import {
  countryAtom,
  countrySelect,
  productAtom,
  productSelect,
  ramiAtom,
  saimAtom,
} from "@/src/state/states";
import { useSelectProducts } from "@/src/services/products/useSelectProducts";
import useSelectCountries from "@/src/services/countries/useSelectCountries";
import useRamis from "@/src/services/ramis/useRamis";
import useActiveSaims from "@/src/services/saim/useActiveSaim";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
const queryClient = new QueryClient();

function RootLayoutComponent({ children, modal }: RootLayoutProps) {
  const { user, error, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setRamis] = useAtom(ramiAtom);
  const [, setSaims] = useAtom(saimAtom);
  const [, setProduct] = useAtom(productAtom);
  const [, setCountry] = useAtom(countryAtom);
  const [, setProductSelect] = useAtom(productSelect);
  const [, setCountrySelect] = useAtom(countrySelect);
  const {
    data: saims,
    isLoading: isSaimsLoading,
    isError: isSaimsError,
  } = useActiveSaims();

  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useProducts();

  const {
    data: countries,
    isLoading: isCountriesLoading,
    isError: isCountriesError,
  } = useCountries();

  const {
    data: productsSelect,
    isLoading: isProductsSelectLoading,
    isError: isProductsSelectError,
  } = useSelectProducts();

  const {
    data: countriesSelect,
    isLoading: isCountriesSelectLoading,
    isError: isCountriesSelectError,
  } = useSelectCountries();

  const {
    data: ramis,
    isLoading: isRamisLoading,
    isError: isRamisError,
  } = useRamis();

  useEffect(() => {
    setRamis(ramis);
    setSaims(saims);
    setProduct(products);
    setCountry(countries);
    setProductSelect(productsSelect);
    setCountrySelect(countriesSelect);
  }, [saims, products, countries, ramis, productSelect, countriesSelect]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex w-full h-screen bg-white">
      <div className="items-end hidden h-full lg:flex">
        <Sidebar visible={sidebarOpen} />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <NavbarDashboard toggleSidebar={toggleSidebar} />
        {children}
      </div>
      {modal}
      <Notifications zIndex={9999} />
    </div>
  );
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RootLayoutComponent {...props} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

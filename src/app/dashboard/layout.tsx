"use client";
import { atom, useAtom } from "jotai";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useShallowEffect } from "@mantine/hooks";
import getAllSaim from "@/src/services/saim/getAllSaim";
import getProduct from "@/src/services/products/getProducts";
import getCountry from "@/src/services/countries/getCountries";
import getSector from "@/src/services/sector/getSector";
import Saim from "@/src/models/saim";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import { saimAtom } from "@/src/state/saim";
import { productAtom } from "@/src/state/products";
import { countryAtom } from "@/src/state/countries";
import { sectorAtom } from "@/src/state/sector";
import { get } from "http";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const queryClient = new QueryClient();

function RootLayoutComponent({ children, modal }: RootLayoutProps) {
  const { user, error, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dataSAIM, setDataSaim] = useAtom(saimAtom);
  const [dataProduct, setDataProduct] = useAtom(productAtom);
  const [dataCountry, setDataCountry] = useAtom(countryAtom);
  const [dataSector, setDataSector] = useAtom(sectorAtom);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Todos los SAIMS
    const allSaim = async () => {
      const saim = await getAllSaim();
      setDataSaim(saim);
    };
    allSaim();

    const allProducts = async () => {
      const products = await getProduct();
      setDataProduct(products);
    }
    allProducts();

    const allCountries = async () => {
      const countries = await getCountry();
      setDataCountry(countries);
    }
    allCountries();

    const allSectors = async () => {
      const sectors = await getSector();
      setDataSector(sectors);
    }
    allSectors();
  }, [setDataSaim]);

  if (isLoading) return <div>cargando...</div>;
  console.log(dataSAIM, dataProduct, dataCountry, dataSector)
  return (
    <div className="bg-white h-screen w-full flex">
      <div className="hidden lg:flex items-end h-full">
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
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <RootLayoutComponent {...props} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

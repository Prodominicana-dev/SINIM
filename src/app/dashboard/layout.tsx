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
import { saimAtom } from "@/src/state/saim";
import { productAtom } from "@/src/state/products";
import { countryAtom } from "@/src/state/countries";
import { sectorAtom } from "@/src/state/sector";
import { useAtom } from "jotai";
import { useProducts } from "@/src/services/products/useProducts";
import "@mantine/core/styles.css";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
const queryClient = new QueryClient();

function RootLayoutComponent({ children, modal }: RootLayoutProps) {
  const { user, error, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setSaim] = useAtom(saimAtom);
  const [, setProducts] = useAtom(productAtom);
  const [, setCountries] = useAtom(countryAtom);
  const [, setSectors] = useAtom(sectorAtom);
  const {
    data: saims,
    isLoading: isSaimsLoading,
    isError: isSaimsError,
  } = useSaims();

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

  useEffect(() => {
    setSaim(saims);
    setProducts(products);
    setCountries(countries);
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
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
      <MantineProvider>
        <RootLayoutComponent {...props} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

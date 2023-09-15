"use client";
import { atom, useAtom } from "jotai";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useShallowEffect } from "@mantine/hooks";
import getAllSaim from "@/src/services/saim/getAllSaim";
import Saim from "@/src/models/saim";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import { saimAtom } from "@/src/state";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const queryClient = new QueryClient();

function RootLayoutComponent({ children, modal }: RootLayoutProps) {
  const { user, error, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useAtom(saimAtom);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Todos los SAIMS
    const getSaim = async () => {
      const response = await getAllSaim();
      setData(response);
    };
    getSaim();
  }, [setData]);

  if (isLoading) return <div>cargando...</div>;

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

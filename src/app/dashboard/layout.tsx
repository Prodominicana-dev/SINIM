"use client";
import { datamarketAtom, tokenAtom } from "@/src/state/states";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import { useAtom } from "jotai";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import { useDataMarkets } from "@/src/services/datamarket/service";
import MobileMenu from "@/src/components/dashboard/mobileMenu";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getCookie, setCookie } from "typescript-cookie";
import { generateToken } from "@/src/services/auth/service";

import { Provider } from "jotai";

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}
const queryClient = new QueryClient();

function RootLayoutComponent({ children, modal }: RootLayoutProps) {
  const { user, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setDataMarket] = useAtom(datamarketAtom);
  const [auth0Token, setAuth0Token] = useAtom(tokenAtom);
  const [openNav, setOpenNav] = useState(false);
  const {
    data: datamarket,
    isLoading: isDataMarketLoading,
    isError: isDataMarketError,
  }: any = useDataMarkets();

  useEffect(() => {
    setDataMarket(datamarket);
  }, [datamarket]);

  useEffect(() => {
    const _sidebarOpen = getCookie("sidebarOpen");
    if (!_sidebarOpen) {
      setCookie("sidebarOpen", true, { expires: 1 });
    }
    setSidebarOpen(_sidebarOpen === "true");
  }, [sidebarOpen]);

  useEffect(() => {
    if (!isLoading) {
      const getToken = async () => {
        const token = await generateToken();
        setCookie("authToken", token, { expires: 1 });
        setAuth0Token(token);
      };
      getToken();
    }
  }, [user, isLoading]);

  const toggleSidebar = () => {
    setCookie("sidebarOpen", !sidebarOpen, { expires: 1 });
    setSidebarOpen(!sidebarOpen);
  };

  const toogleOpenDrawer = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="flex w-full h-screen bg-white">
      <div className="items-end hidden h-full lg:flex">
        <Sidebar visible={sidebarOpen} />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <NavbarDashboard
          toggleSidebar={toggleSidebar}
          openNav={openNav}
          openDrawer={toogleOpenDrawer}
        />
        {children}
      </div>
      {modal}
      <Notifications zIndex={9999} />

      <MobileMenu isOpen={openNav} onClose={toogleOpenDrawer} />
    </div>
  );
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Provider>
          <RootLayoutComponent {...props} />
        </Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

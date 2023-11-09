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
import { generateToken, getDomains } from "@/src/services/auth/service";

import { Provider } from "jotai";
import axios from "axios";

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
    const sidebarOpen = localStorage.getItem("sidebarOpen");
    if (sidebarOpen === null) {
      localStorage.setItem("sidebarOpen", "true");
      setSidebarOpen(true);
    } else {
      setSidebarOpen(sidebarOpen === "true");
    }
  }, []);

  const toggleSidebar = () => {
    const newSidebarOpen = !sidebarOpen;
    localStorage.setItem("sidebarOpen", newSidebarOpen.toString());
    setSidebarOpen(newSidebarOpen);
  };

  useEffect(() => {
    if (!user) {
      localStorage.setItem("sied", "false");
      localStorage.setItem("saim", "false");
    }
  }, [user]);

  useEffect(() => {
    if (!isLoading) {
      const getToken = async () => {
        const token = await generateToken();
        setCookie("authToken", token, {
          expires: 1,
        });
        setAuth0Token(token);
      };
      const getDomainsP = async () => {
        let saimDomains: any[] = [];
        let siedDomains: any[] = [];
        const domains = await getDomains(
          `${process.env.NEXT_PUBLIC_API_URL}/reserved-domains`
        );
        siedDomains = domains.data.sied;
        saimDomains = domains.data.saim;
        // Comprobar si el correo del usuario esta en la lista de dominios, si esta en la de sied colocar en localStorage que puede ver sied y si esta tambien en la de saim colocar en localStorage que puede ver saim
        if (user) {
          const email = user.email;
          const sied = siedDomains.find((domain: any) =>
            email?.includes(domain)
          );
          const saim = saimDomains.find((domain: any) =>
            email?.includes(domain)
          );
          if (sied) {
            localStorage.setItem("sied", "true");
          }
          if (saim) {
            localStorage.setItem("saim", "true");
          }
        }
        if (!user) {
          localStorage.setItem("sied", "false");
          localStorage.setItem("saim", "false");
        }
      };
      getToken();
      getDomainsP();
    }
  }, [user, isLoading]);

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

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
    if(!isLoading){
      var options = {
        method: 'POST',
        url: `${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: `${process.env.API_CLIENT_ID}`,
          client_secret: `${process.env.API_CLIENT_SECRET}`,
          audience: `${process.env.API_IDENTIFIER}`
        })
      };
      axios.request(options).then(function (response) {
        const {access_token} = response.data
        setAuth0Token(access_token)
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, [user, isLoading]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const openDrawer = () => setOpenNav(true);
  const closeDrawer = () => setOpenNav(false);

  return (
    <div className="flex w-full h-screen bg-white">
      <div className="items-end hidden h-full lg:flex">
        <Sidebar visible={sidebarOpen} />
      </div>
      <div className="w-full h-full overflow-y-auto">
        <NavbarDashboard
          toggleSidebar={toggleSidebar}
          openNav={openNav}
          openDrawer={openDrawer}
        />
        {children}
      </div>
      {modal}
      <Notifications zIndex={9999} />

      <MobileMenu isOpen={openNav} onClose={closeDrawer} />
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

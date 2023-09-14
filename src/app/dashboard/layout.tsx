"use client";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ReactNode, useState } from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>cargando...</div>;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <div className="bg-white h-screen w-full flex">
        <div className="hidden lg:flex items-end h-full">
          <Sidebar visible={sidebarOpen} />
        </div>
        <div className="w-full h-full overflow-y-auto">
          <NavbarDashboard toggleSidebar={toggleSidebar} />
          {children}
        </div>
      </div>
      {modal}
          <Notifications zIndex={9999} />
    </MantineProvider>
    </>
  );
}

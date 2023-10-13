"use client";
import {
  XMarkIcon,
  UserCircleIcon,
  ChartBarIcon,
  RectangleStackIcon,
  BellAlertIcon,
  ExclamationCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Drawer,
  Button,
  Avatar,
} from "@material-tailwind/react";
import {
  countryAtom,
  countrySelect,
  productAtom,
  productSelect,
  ramiAtom,
  saimAtom,
} from "@/src/state/states";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Suscribe from "@/src/components/saim/Suscribe/suscribe";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { NavbarDashboard } from "@/src/components/dashboard/navbar";
import { useAtom } from "jotai";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import {
  useProducts,
  useSelectProducts,
} from "@/src/services/products/service";
import {
  useCountries,
  useSelectCountries,
} from "@/src/services/countries/service";
import { useRamis } from "@/src/services/ramis/service";
import { useActiveSaims } from "@/src/services/saim/service";

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}
const queryClient = new QueryClient();

function NavigationLink({ option, isActive, onClose }: any) {
  const linkClasses = `flex flex-row items-center justify-start w-full p-4 gap-3 text-center bg-transparent shadow-none h-12 rounded-lg ${
    isActive ? "bg-navy/90 text-white" : "text-navy"
  }`;

  const iconClasses = `w-4 h-4 ${isActive ? "text-white" : "text-navy"}`;
  const textClasses = isActive
    ? "text-white font-normal"
    : "text-black font-thin";

  return (
    <Link href={option.href} className={linkClasses} onClick={onClose}>
      {option.icon && <option.icon.type className={iconClasses} />}
      <p className={textClasses}>{option.text}</p>
    </Link>
  );
}

function NavigationDrawer({ isOpen, onClose }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const callbackUrl = `${baseUrl}${pathname}`;
  const navigationOptions = [
    { href: "#", icon: <UserCircleIcon />, text: "Perfíl" },
    { href: "#", icon: <ChartBarIcon />, text: "DataMarket" },
    { href: "/dashboard/rami", icon: <RectangleStackIcon />, text: "RAMI" },
    { href: "/dashboard/saim", icon: <BellAlertIcon />, text: "SAIM" },
    { href: "#", icon: <ExclamationCircleIcon />, text: "SIED" },
    {
      href: `/api/auth/logout?returnTo=${encodeURIComponent(callbackUrl)}`,
      icon: <ArrowLeftOnRectangleIcon />,
      text: "Cerrar sesión",
    },
  ];
  const { user, error, isLoading } = useUser();
  const [suscribeOpen, setSuscribeOpen] = React.useState(false);
  const handleSuscribeOpen = () => {
    setSuscribeOpen(!suscribeOpen);
  };
  return (
    <React.Fragment>
      <Drawer
        open={isOpen}
        onClose={onClose}
        placement="right"
        className="z-[9999] h-screen flex flex-col justify-between"
      >
        <div className="flex flex-col items-center justify-between bg-[url('/images/logo/accountLog.jpg')]">
          <div className="flex flex-row items-center justify-between w-full px-4 pt-2">
            <Typography variant="h5" color="white">
              SINIM
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={onClose}>
              <XMarkIcon className="w-6 h-6 text-white" />
            </IconButton>
          </div>
          <div className="w-full p-4 space-y-4">
            {user ? (
              <>
                <Avatar
                  variant="circular"
                  size="lg"
                  className=""
                  src={user.picture as string}
                />
                <Typography className="font-thin text-white">
                  {user.name}
                </Typography>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-2 h-4/6">
          {navigationOptions.map((option, index) => (
            <NavigationLink
              key={index}
              option={option}
              onClose={onClose}
              isActive={pathname.includes(option.text.toLowerCase())}
            />
          ))}
        </div>
        <div className="p-2">
          {pathname === "/dashboard/saim" ? (
            <>
              <button
                onClick={() => {
                  handleSuscribeOpen();
                  onClose();
                }}
                className="w-full flex justify-center items-center text-white rounded-xl p-4 h-12 bg-gradient-to-tr from-purple-500 from-[15%] via-sky-600 to-sky-400"
              >
                Suscríbete
              </button>
            </>
          ) : null}
        </div>
        {suscribeOpen && user ? (
          <Suscribe
            open={suscribeOpen}
            handleOpen={handleSuscribeOpen}
            email={user.email ?? ""}
          />
        ) : null}
      </Drawer>
    </React.Fragment>
  );
}

function RootLayoutComponent({ children, modal }: RootLayoutProps) {
  const { user, error, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setRamis] = useAtom(ramiAtom);
  const [, setSaims] = useAtom(saimAtom);
  const [, setProduct] = useAtom(productAtom);
  const [, setCountry] = useAtom(countryAtom);
  const [, setProductSelect] = useAtom(productSelect);
  const [, setCountrySelect] = useAtom(countrySelect);
  const [openNav, setOpenNav] = React.useState(false);
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
  }, [
    saims,
    products,
    countries,
    ramis,
    productsSelect,
    countriesSelect,
    setCountry,
    setCountrySelect,
    setProduct,
    setProductSelect,
    setRamis,
    setSaims,
  ]);

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

      <NavigationDrawer isOpen={openNav} onClose={closeDrawer} />
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

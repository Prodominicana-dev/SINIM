"use client";
import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Drawer,
  Button,
} from "@material-tailwind/react";

import UserProfile from "./userprofile";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Suscribe from "../saim/Suscribe/suscribe";
import { useRouter } from "next/navigation";

export function NavbarDashboard({ toggleSidebar, openDrawer, openNav }: any) {
  const routes = [
    { path: "rami", title: "RAMI" },
    { path: "saim", title: "SAIM" },
    { path: "sied", title: "SIED" },
    { path: "datamarket", title: "Data Market" },
    // Puedes agregar más rutas aquí cuando necesites
  ];
  const pathname = usePathname();
  const currentPath = pathname.toLowerCase();
  const currentRoute = routes.find((route) => currentPath.includes(route.path));
  const title = currentRoute ? currentRoute.title : "SINIM";
  const [suscribeOpen, setSuscribeOpen] = React.useState(false);
  const { user, error, isLoading } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const callbackUrl = `${baseUrl}/dashboard/saim#suscribe`;
  const handleSuscribeOpen = () => {
    if (!user) return router.push(`/api/auth/login?returnTo=${callbackUrl}`);
    setSuscribeOpen(!suscribeOpen);
  };
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (path.includes("suscribe")) {
      setSuscribeOpen(true);
    }
  }, [path]);

  return (
    <Navbar
      color="white"
      className="w-full max-w-none rounded-none shadow-none h-[10vh]"
    >
      <div className="container flex items-center justify-between h-full mx-2 text-blue-gray-900 max-w-none">
        <div className="hidden w-4/12 lg:flex lg:justify-start ">
          <button className="" onClick={toggleSidebar}>
            <Bars3Icon className="w-10" />
          </button>
        </div>
        <Typography className="w-4/12 text-3xl font-medium text-center font-custom">
          {title}
        </Typography>

        <div className="hidden w-4/12 lg:flex lg:flex-row lg:space-x-4 lg:justify-end">
          {pathname === "/dashboard/saim" ? (
            <>
              <button
                onClick={handleSuscribeOpen}
                className="w-36 h-12 bg-gradient-to-r from-purple-600 hover:from-purple-700 from-[20%] rounded-lg via-sky-400 hover:via-sky-500 to-sky-300 hover:to-sky-400 duration-700 text-white font-semibold s"
              >
                Suscríbete
              </button>
            </>
          ) : null}
          <UserProfile />
        </div>
        <React.Fragment>
          <IconButton
            variant="text"
            className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={openDrawer}
          >
            {openNav ? (
              <XMarkIcon className="text-black w-7" />
            ) : (
              <Bars3Icon className="text-black w-7" />
            )}
          </IconButton>
        </React.Fragment>
      </div>
      {suscribeOpen && user ? (
        <Suscribe
          open={suscribeOpen}
          handleOpen={handleSuscribeOpen}
          email={user.email ?? ""}
        />
      ) : null}
    </Navbar>
  );
}

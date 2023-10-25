"use client";
import { Fragment, useEffect, useState } from "react";
import { Navbar, Typography, IconButton } from "@material-tailwind/react";

import UserProfile from "./userprofile";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Suscribe from "../saim/Suscribe/suscribe";
import { useRouter } from "next/navigation";
import axios from "axios";
import { set } from "date-fns";
import { useEffectOnce } from "usehooks-ts";



export function NavbarDashboard({ toggleSidebar, openDrawer, openNav }: any) {
  const routes = [
    { path: "rami", title: "REQUISITO DE ACCESO A MERCADOS INTERNACIONALES" },
    { path: "saim", title: "ALERTAS COMERCIALES" },
    { path: "sied", title: "ALERTAS DE IED" },
    { path: "datamarket", title: "Data Market" },
    // Puedes agregar más rutas aquí cuando necesites
  ];
  const pathname = usePathname();
  const currentPath = pathname.toLowerCase();
  const currentRoute = routes.find((route) => currentPath.includes(route.path));
  const title = currentRoute ? currentRoute.title : "SINIM";
  const [suscribeOpen, setSuscribeOpen] = useState(false);
  const [permissions, setPermissions] = useState<any[]>([]);
  const { user, error, isLoading } = useUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const callbackUrl = `${baseUrl}/dashboard/saim#suscribe`;
  const handleSuscribeOpen = () => {
    if (!user) return router.push(`/api/auth/login?returnTo=${callbackUrl}`);
    setSuscribeOpen(!suscribeOpen);
  };
  const router = useRouter();
  if(isLoading) return <></>  
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
        <Typography className="w-6/12 pt-3 text-3xl font-medium text-left lg:text-center font-custom">
          {title}
        </Typography>

        <div className="hidden w-4/12 lg:flex lg:flex-row lg:space-x-4 lg:justify-end">
          {pathname === "/dashboard/saim" ? (
            <>
              <button
                onClick={handleSuscribeOpen}
                className="h-12 font-semibold duration-300 rounded-md w-36 ring-2 ring-navy hover:bg-navy hover:text-white text-navy "
              >
                Suscríbete
              </button>
            </>
          ) : null}
          <UserProfile />
        </div>
        <Fragment>
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
        </Fragment>
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

export function hasAllPermissions(permissions: string[], permissionsToCheck: string[]): boolean {
  // Verifica que cada permiso requerido esté presente en los permisos del usuario
  for (const requiredPermission of permissionsToCheck) {
    if (!permissions.includes(requiredPermission)) {
      return false; // Si falta uno de los permisos requeridos, retorna false
    }
  }
  return true; // Todos los permisos requeridos están presentes
}



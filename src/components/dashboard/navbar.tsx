"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import UserProfile from "./userprofile";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Suscribe from "../saim/Suscribe/suscribe";

export function NavbarDashboard({ toggleSidebar }: any) {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname();
  const [suscribeOpen, setSuscribeOpen] = React.useState(false);
  const { user, error, isLoading } = useUser();
  const handleSuscribeOpen = () => {
    setSuscribeOpen(!suscribeOpen);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:justify-end lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="font-2xl"
      >
        <Link href="#" className="flex items-center">
          Pages
        </Link>
      </Typography>
    </ul>
  );

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
          SAIM
        </Typography>
        
        <div className="hidden w-4/12 lg:flex lg:flex-row lg:space-x-4 lg:justify-end">
        {pathname === "/dashboard/saim" ? (<>
          <button onClick={handleSuscribeOpen}>Suscríbete</button>
        </>) : null}
          <UserProfile />
        </div>
        <IconButton
          variant="text"
          className="w-6 h-6 ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="text-black w-7" />
          ) : (
            <Bars3Icon className="text-black w-7" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
      {suscribeOpen ? (<Suscribe open={suscribeOpen} handleOpen={handleSuscribeOpen} email={user?.email} />) : null}
    </Navbar>
  );
}

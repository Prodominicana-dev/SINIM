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

export function NavbarDashboard({ toggleSidebar }: any) {
  const [openNav, setOpenNav] = React.useState(false);

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
      <div className="container h-full mx-2 flex items-center justify-between text-blue-gray-900 max-w-none">
        <div className="basis-1/12 hidden lg:block">
          <button className="" onClick={toggleSidebar}>
            <Bars3Icon className="w-10" />
          </button>
        </div>
        <Typography className="font-medium font-custom text-3xl">
          SAIM
        </Typography>
        <div className="hidden lg:block">
          <UserProfile />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="w-7 text-black" />
          ) : (
            <Bars3Icon className="w-7 text-black" />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </Collapse>
    </Navbar>
  );
}

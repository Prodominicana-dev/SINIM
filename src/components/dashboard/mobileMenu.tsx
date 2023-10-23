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
  Typography,
  IconButton,
  Drawer,
  Avatar,
} from "@material-tailwind/react";
import { Fragment, useState } from "react";
import Suscribe from "../saim/Suscribe/suscribe";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function MobileMenu({ isOpen, onClose }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const callbackUrl = `${baseUrl}${pathname}`;
  const navigationOptions = [
    { href: "#", icon: <UserCircleIcon />, text: "Perfíl" },
    { href: "#", icon: <ChartBarIcon />, text: "DataMarket" },
    { href: "/dashboard/rami", icon: <RectangleStackIcon />, text: "RAMI" },
    { href: "/dashboard/saim", icon: <BellAlertIcon />, text: "SAIM" },
    { href: "/dashboard/sied", icon: <ExclamationCircleIcon />, text: "SIED" },
    {
      href: `/api/auth/logout?returnTo=${encodeURIComponent(callbackUrl)}`,
      icon: <ArrowLeftOnRectangleIcon />,
      text: "Cerrar sesión",
    },
  ];
  const { user, error, isLoading } = useUser();
  const [suscribeOpen, setSuscribeOpen] = useState(false);
  const handleSuscribeOpen = () => {
    setSuscribeOpen(!suscribeOpen);
  };
  return (
    <Fragment>
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
    </Fragment>
  );
}

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

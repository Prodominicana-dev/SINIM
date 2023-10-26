import {
  XMarkIcon,
  UserCircleIcon,
  ChartBarIcon,
  RectangleStackIcon,
  BellAlertIcon,
  ExclamationCircleIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
  PresentationChartBarIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  IconButton,
  Drawer,
  Avatar,
  Accordion,
  AccordionHeader,
  AccordionBody,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { Fragment, useState } from "react";
import Suscribe from "../saim/Suscribe/suscribe";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import DataMarketIcon from "../svg/datamarket";
import { useDataMarketsCategories } from "@/src/services/datamarket/service";
import DataMarketMenu from "./mobileDatamarketMenu";
import RamiIcon from "../svg/rami";
import SaimIcon from "../svg/saim";
import SiedIcon from "../svg/sied";
import SiedSubscribe from "../sied/Suscribe/suscribe";
import Login from "../validate/login";

export default function MobileMenu({ isOpen, onClose }: any) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const callbackUrl = `${baseUrl}${pathname}`;
  const navigationOptions = [
    { href: "/dashboard/rami", icon: <RamiIcon color="navy" />, text: "RAMI" },
    { href: "/dashboard/saim", icon: <SaimIcon color="navy" />, text: "Alertas Comerciales" },
    { href: "/dashboard/sied", icon: <SiedIcon color="navy" />, text: "Alertas de IED" },
    // {
    //   href: `/api/auth/logout?returnTo=${encodeURIComponent(callbackUrl)}`,
    //   icon: <ArrowLeftOnRectangleIcon />,
    //   text: "Cerrar sesión",
    // },
  ];
  const { user, error, isLoading: userLoading } = useUser();
  const saimCallbackUrl = `${baseUrl}/dashboard/saim`;
  const siedCallbackUrl = `${baseUrl}/dashboard/sied`;
  const [suscribeSied, setSuscribeSied] = useState(false);
  const router = useRouter();
  const handleSiedSuscribeOpen = () => {
    if (!user) return ( <Login />)
    setSuscribeSied(!suscribeSied);
  };
  const [suscribeOpen, setSuscribeOpen] = useState(false);
  const { data, isLoading, isError }: any = useDataMarketsCategories();
  const handleSuscribeOpen = () => {
    if (!user) return ( <Login />)
    setSuscribeOpen(!suscribeOpen);
  };

  const [open, setOpen] = useState(0);
  const handleOpen = (value : number) => setOpen(open === value ? 0 : value);
  return (
    <Fragment>
      <Drawer
        open={isOpen}
        onClose={onClose}
        placement="right"
        className="z-[9999] flex flex-col overflow-y-auto"
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
        <div className="flex flex-col h-full gap-4 p-2">
       <List className="flex flex-col justify-between h-full">
       <div>
       <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className="p-3 border-b-0">
              <ListItemPrefix>
              <DataMarketIcon color="navy"/>
              </ListItemPrefix>
              <Typography className="mr-auto font-normal text-navy">
                Datamarket
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
          <List className="p-0 text-navy">
              {!isLoading ? (
                data?.map((datamarket: any, key: number) =>
                  datamarket.data.length > 1 ? (
                    <DataMarketMenu 
                      title={datamarket.category}
                      data={datamarket.data}
                      key={key}/>
                  ) : (
                    <Link
                      href={`/dashboard/datamarket/${datamarket.data[0].id}`}
                      key={key}
                    >
                      <ListItem>
                        <ListItemPrefix>
                          <div></div>
                        </ListItemPrefix>
                        {datamarket.data[0].title}
                      </ListItem>
                    </Link>
                  )
                )
              ) : (
                <ListItem>Loading...</ListItem>
              )}
            </List>
          </AccordionBody>
        </Accordion>
        {navigationOptions.map((option: any, key: number) =>(
          <Link href={option.href}>
                <ListItem className="focus:bg-transparent">
                  <ListItemPrefix> 
                    {option.icon}
                  </ListItemPrefix>
                  <Typography
                    className="mr-auto font-normal text-navy"
                  >
                    {option.text}
                  </Typography>
                </ListItem>
              </Link>
        ))}
       </div>
        <div className="p-2 space-y-4">
          {pathname === "/dashboard/saim" ? (
            <>
              <button
                onClick={() => {
                  handleSuscribeOpen();
                  onClose();
                }}
                className="flex items-center justify-center w-full h-12 p-4 bg-white border-2 text-navy rounded-xl border-navy"
              >
                Suscríbete
              </button>
            </>
          ) : null}
          {pathname === "/dashboard/sied" ? (
            <>
              <button
                onClick={() => {
                  handleSiedSuscribeOpen();
                  onClose();
                }}
                className="w-full flex justify-center items-center text-navy rounded-xl p-4 h-12 bg-white border-2 border-navy from-purple-500 from-[15%] via-sky-600 to-sky-400"
              >
                Suscríbete
              </button>
            </>
          ) : null}
          <Link href={user ? `/api/auth/logout?returnTo=${encodeURIComponent(callbackUrl)}` : `/api/auth/login?returnTo=${callbackUrl}`}
            className="flex items-center justify-center w-full h-12 p-4 text-white rounded-xl bg-navy">
                {user ? "Cerrar sesión" : "Iniciar sesión"}
          </Link>
        </div>
       </List>
        </div>
        
        {suscribeOpen && user ? (
          <Suscribe
            open={suscribeOpen}
            handleOpen={handleSuscribeOpen}
            email={user.email ?? ""}
          />
        ) : null}
         {suscribeSied && user ? (
        <SiedSubscribe
        open={suscribeSied} 
        handleOpen={handleSiedSuscribeOpen}
        email={user.email ?? ""}
        />
      ) : null}
      </Drawer>
    </Fragment>
  );
}



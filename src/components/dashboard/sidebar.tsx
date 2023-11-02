"use client";
// @ts-ignore
import { useEffect, useRef, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Switch,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon, CogIcon } from "@heroicons/react/24/outline";
import { useHover } from "usehooks-ts";
import Image from "next/image";
import Link from "next/link";
import SidebarMenu from "./sidebarMenu";
import { useDataMarketsCategories } from "@/src/services/datamarket/service";
import { useRouter, usePathname } from "next/navigation";
import { getCookie, setCookie } from "typescript-cookie";

export function Sidebar({ visible }: any) {
  const [open, setOpen] = useState(0);
  const { data, isLoading, isError }: any = useDataMarketsCategories();
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  const [isConfig, setIsConfig] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const lastPath = path.includes("datamarket")
    ? "/datamarket"
    : path.substring(path.lastIndexOf("/"));

  useEffect(() => {
    const config = getCookie("isConfig");
    if (!config) {
      setCookie("isConfig", false, { expires: 1 });
    }
    setIsConfig(config === "true");
  }, [isConfig]);

  const handleIsConfig = () => {
    setCookie("isConfig", !isConfig, { expires: 1 });
    setIsConfig(!isConfig);
  };

  // useEffect(() => {
  //   if (isConfig) {
  //     return router.push(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings${lastPath}`
  //     );
  //   }
  //   return router.push(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard${
  //       lastPath.includes("datamarket") ? "/datamarket/1" : lastPath
  //     }`
  //   );
  // }, [isConfig]);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (!isHover) {
      setOpen(0);
    }
  }, [setOpen, isHover]);

  return (
    <div
      ref={hoverRef}
      className={`h-full hover:w-72 duration-700 group ${
        visible ? "w-28 p-4" : "w-0 p-0"
      }
        ${isConfig ? "bg-[#051544]" : "bg-navy"}
      `}
    >
      <div className="p-4 mb-2 text-white">
        <Link href={"/"}>
          <Image
            src={"/svg/sinim.svg"}
            alt=""
            width={1920}
            height={1080}
          ></Image>
        </Link>
      </div>
      <List
        className={` ${
          visible ? "opacity-100 visible" : "opacity-0 invisible"
        } duration-200`}
      >
        {isConfig ? (
          <SidebarItem
            title={"DataMarket"}
            url={
              isConfig
                ? "/dashboard/settings/datamarket"
                : "/dashboard/datamarket"
            }
            iconUrl={"/images/logo/datamarket-white.svg"}
          />
        ) : (
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform opacity-0 group-hover:opacity-100 invisible group-hover:visible text-white ${
                  open === 1 ? "rotate-180" : ""
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="p-3 border-b-0"
              >
                <ListItemPrefix>
                  <Image
                    src={"/images/logo/datamarket-white.svg"}
                    width={600}
                    height={600}
                    draggable={false}
                    alt=""
                    className="w-10 h-10 text-white duration-700 group-hover:h-7 group-hover:w-7"
                  />
                </ListItemPrefix>
                <Typography
                  color="white"
                  className="mr-auto font-normal duration-300 opacity-0 group-hover:opacity-100"
                >
                  DataMarket
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 text-white">
                {!isLoading ? (
                  data?.map((datamarket: any, key: number) =>
                    datamarket.data.length > 1 ? (
                      <SidebarMenu
                        isHover={isHover}
                        title={datamarket.category}
                        data={datamarket.data}
                        key={key}
                      />
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
        )}

        <SidebarItem
          title={"RAMI"}
          url={isConfig ? "/dashboard/settings/rami" : "/dashboard/rami"}
          iconUrl={"/images/logo/rami-white.svg"}
        />
        <SidebarItem
          title={"Alertas Comerciales"}
          url={isConfig ? "/dashboard/settings/saim" : "/dashboard/saim"}
          iconUrl={"/images/logo/saim-white.svg"}
        />
        <SidebarItem
          title={"Alertas de IED"}
          url={isConfig ? "/dashboard/settings/sied" : "/dashboard/sied"}
          iconUrl={"/images/logo/sied-white.svg"}
        />
        {isConfig ? (
          <>
            <SidebarItem
              title={"Productos"}
              url={"/dashboard/settings/products"}
              iconUrl={"/images/logo/sied-white.svg"}
            />
            <SidebarItem
              title={"Usuarios"}
              url={"/dashboard/settings/users"}
              iconUrl={"/images/logo/sied-white.svg"}
            />
            <SidebarItem
              title={"Fuentes externas"}
              url={"/dashboard/settings/partners"}
              iconUrl={"/images/logo/sied-white.svg"}
            />
          </>
        ) : null}
      </List>
      <div
        className={`p-4 absolute bottom-4 left-4 self-center  z-0 ${
          visible ? "opacity-100 duration-1000" : "opacity-0 duration-200"
        }`}
      >
        <Button
          className={`flex justify-center items-center space-x-3 bg-white p-2 w-14 group-hover:h-full  rounded-full duration-700 text-navy group-hover:w-56  ${
            isConfig ? "bg-sky-500" : "bg-white"
          }`}
          onClick={() => {
            handleIsConfig();
          }}
        >
          <CogIcon
            className={`w-10 duration-300 ${
              isConfig ? "text-white" : "text-navy"
            }`}
          />
          <div
            className={`group-hover:block hidden duration-700 ${
              isConfig ? "text-white" : "text-navy"
            }`}
          >
            Configuracion
          </div>
        </Button>
      </div>
    </div>
  );
}

function SidebarItem({ title, url, iconUrl }: any) {
  return (
    <Link href={url}>
      <ListItem className="focus:bg-transparent">
        <ListItemPrefix>
          <Image
            src={iconUrl}
            width={600}
            height={600}
            draggable={false}
            alt=""
            className="w-10 h-10 text-white duration-700 group-hover:h-7 group-hover:w-7"
          />
        </ListItemPrefix>
        <Typography
          color="white"
          className="invisible mr-auto font-normal duration-300 opacity-0 group-hover:opacity-100 group-hover:visible"
        >
          {title}
        </Typography>
      </ListItem>
    </Link>
  );
}

"use client";
// @ts-ignore
import React, { useEffect, useRef } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { PresentationChartBarIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useHover } from "usehooks-ts";
import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { datamarketAtom } from "@/src/state/states";
import SidebarMenu from "./sidebarMenu";
import { useDataMarketsCategories } from "@/src/services/datamarket/service";

export function Sidebar({ visible }: any) {
  const [open, setOpen] = React.useState(0);
  const datamarket = useAtom(datamarketAtom);
  const { data, isLoading, isError }: any = useDataMarketsCategories();
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

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
      className={`h-full  bg-navy hover:w-72 duration-700 group ${
        visible ? "w-28 p-4" : "w-0 p-0"
      }`}
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
      <List className={` ${visible ? "visible" : "invisible"} duration-200`}>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform opacity-0 group-hover:opacity-100 text-white ${
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
                Datamarket
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0 text-white">
              {data?.map((datamarket: any, key: number) =>
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
              )}
            </List>
          </AccordionBody>
        </Accordion>
        <Link href={"/dashboard/rami"}>
          <ListItem className="focus:bg-transparent">
            <ListItemPrefix>
              <Image
                src={"/images/logo/rami-white.svg"}
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
              RAMI
            </Typography>
          </ListItem>
        </Link>
        <Link href={"/dashboard/saim"}>
          <ListItem className="focus:bg-transparent">
            <ListItemPrefix>
              <Image
                src={"/images/logo/saim-white.svg"}
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
              SAIM
            </Typography>
          </ListItem>
        </Link>
        <Link href={"/dashboard/sied"}>
          <ListItem className="focus:bg-transparent">
            <ListItemPrefix>
              <Image
                src={"/images/logo/sied-white.svg"}
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
              SIED
            </Typography>
          </ListItem>
        </Link>
      </List>
    </div>
  );
}

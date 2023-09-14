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

export function Sidebar({ visible }: any) {
  const [open, setOpen] = React.useState(0);
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);

  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  useEffect(() => {
    if (!isHover) {
      setOpen(0);
    }
  });

  return (
    <div
      ref={hoverRef}
      className={`h-full  bg-navy hover:w-72 duration-700 group ${
        visible ? "w-28 p-4" : "w-0 p-0"
      }`}
    >
      <div className="mb-2 p-4">
        <div>SINIM</div>
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
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <Image
                  src={"/images/logo/datamarket-white.svg"}
                  width={600}
                  height={600}
                  draggable={false}
                  alt=""
                  className="h-10 w-10 text-white group-hover:h-7 group-hover:w-7 duration-700"
                />
                {/* <PresentationChartBarIcon className="h-8 w-8 text-white group-hover:h-5 group-hover:w-5 duration-700" /> */}
              </ListItemPrefix>
              <Typography
                color="white"
                className="mr-auto font-normal opacity-0 group-hover:opacity-100 duration-300"
              >
                Datamarket
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Analytics
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Reporting
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                Projects
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <Image
              src={"/images/logo/rami-white.svg"}
              width={600}
              height={600}
              draggable={false}
              alt=""
              className="h-10 w-10 text-white group-hover:h-7 group-hover:w-7 duration-700"
            />
          </ListItemPrefix>
          <Typography
            color="white"
            className="mr-auto font-normal opacity-0 group-hover:opacity-100 duration-300"
          >
            RAMI
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Image
              src={"/images/logo/saim-white.svg"}
              width={600}
              height={600}
              draggable={false}
              alt=""
              className="h-10 w-10 text-white group-hover:h-7 group-hover:w-7 duration-700"
            />
          </ListItemPrefix>
          <Typography
            color="white"
            className="mr-auto font-normal opacity-0 group-hover:opacity-100 duration-300"
          >
            SAIM
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Image
              src={"/images/logo/sied-white.svg"}
              width={600}
              height={600}
              draggable={false}
              alt=""
              className="h-10 w-10 text-white group-hover:h-7 group-hover:w-7 duration-700"
            />
          </ListItemPrefix>
          <Typography
            color="white"
            className="mr-auto font-normal opacity-0 group-hover:opacity-100 duration-300"
          >
            SIED
          </Typography>
        </ListItem>
      </List>
    </div>
  );
}

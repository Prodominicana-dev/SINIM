"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import Saim from "@/src/models/saim";
import SCard from "./card";
import React from "react";

export default function SettingsFeed({
  queryI,
  update,
}: {
  queryI: any;
  update: () => void;
}) {
  const { fetchNextPage, hasNextPage, data } = queryI;
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  const _allSaim = data?.pages.map((page: any) => page.data).flat();

  return (
    <>
      {_allSaim?.map((saim: Saim, i: number) => {
        if (i === _allSaim.length - 1)
          return (
            <div ref={ref} key={saim.id} className="w-full h-full">
              <SCard key={saim.id} data={saim} update={update} />
            </div>
          );
        return (
          <div key={saim.id} className="w-full h-full">
            <SCard key={saim.id} data={saim} update={update} />
          </div>
        );
      })}
    </>
  );
}

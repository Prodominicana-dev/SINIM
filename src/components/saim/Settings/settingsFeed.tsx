"use client";

import { useEffect, useRef, useState } from "react";
import { UseInfiniteQueryResult, useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import Saim from "@/src/models/saim";
import { useSaimsPage } from "@/src/services/saim/useSaimsPage";
import SCard from "../../settings/saim/card";

export default function SettingsFeed({queryI, updateSaims}: {queryI:UseInfiniteQueryResult, updateSaims: () => void}) {
    const { fetchNextPage, hasNextPage, data } =
    queryI;
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  const _allSaim = data?.pages.flatMap((saim: any) => saim);

  return (
    <>
        {_allSaim?.map((saim: Saim, i: number) => {
            if (i === _allSaim.length - 1)
            return (
            <div ref={ref} key={saim.id} className="w-full h-full">
                <SCard key={saim.id} data={saim} updateSaims={updateSaims} />
            </div>
            );
            return (
            <div  key={saim.id} className="w-full h-full">
                <SCard key={saim.id} data={saim} updateSaims={updateSaims} />
            </div>
            );
        })}        
    </>

)
}

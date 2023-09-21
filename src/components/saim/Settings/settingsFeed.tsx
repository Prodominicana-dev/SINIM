"use client";

import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import Saim from "@/src/models/saim";
import { useSaimsPage } from "@/src/services/saim/useSaimsPage";
import SCard from "../../settings/saim/card";

export default function SettingsFeed({updateSaims}: {updateSaims: () => void}) {
    const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useSaimsPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry]);

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

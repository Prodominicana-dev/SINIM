"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import SaimCard from "./card";
import Saim from "@/src/models/saim";
import { useActiveSaimsPage } from "@/src/services/saim/service";
import NotFound from "../validate/notFound";

export default function Feed() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useActiveSaimsPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  const _allSaim = data?.pages.map((page) => page.data).flat();

  return (
    <>
    {_allSaim?.length === 0 ? (<NotFound />) : (<>
      <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {_allSaim?.map((saim: Saim, i: number) => {
        if (i === _allSaim.length - 1)
          return (
            <div ref={ref} key={saim.id}>
              <SaimCard {...saim} />
            </div>
          );
        return (
          <div key={saim.id}>
            <SaimCard {...saim} />
          </div>
        );
      })}
    </div>
    </>)}
    
    </>
    
  );
}

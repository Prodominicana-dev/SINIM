"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import SaimCard from "./card";
import getAllSaim from "@/src/services/saim/getAllSaim";
import Saim from "@/src/models/saim";
import getPaginatedSaim from "@/src/services/saim/getPaginatedSaim";

export default function Feed() {
  const [allSaim, setAllSaim] = useState<Saim[]>([]);

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery(
      ["query"],
      async ({ pageParam = 1 }) => {
        const response = await getPaginatedSaim(pageParam);
        return response;
      },
      {
        getNextPageParam: (_: any, pages: string | any[]) => {
          return pages.length + 1;
        },
      }
    );
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
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
  );
}

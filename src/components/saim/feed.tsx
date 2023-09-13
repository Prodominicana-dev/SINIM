"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "@mantine/hooks";
import SaimCard from "./card";
import getAllSaim from "@/src/services/saim/getAllSaim";
import Saim from "@/src/models/saim";

export default function Feed() {
  const [allSaim, setAllSaim] = useState<Saim[]>([]);

  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useInfiniteQuery(
      ["query"],
      async ({ pageParam = 1 }) => {
        const response = await getAllSaim(pageParam);
        return response;
      },
      {
        getNextPageParam: (_, pages) => {
          return pages.length + 1;
        },
      }
    );

  useEffect(() => {
    if (isFetchingNextPage)
      <div className="text-5xl text-black">CARGANDO...</div>;
    if (hasNextPage && entry.isIntersecting) fetchNextPage();
  });

  const _allSaim = data?.pages.flatMap((saim) => saim);
  console.log(_allSaim);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8"
    >
      {_allSaim?.map((saim) => (
        <div ref={ref} key={saim.id}>
          <SaimCard {...saim} />
        </div>
      ))}
    </div>
  );
}

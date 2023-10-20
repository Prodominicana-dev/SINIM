"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import SiedCard from "./card";
import Sied from "@/src/models/sied";
import { useActiveSiedsPage } from "@/src/services/sied/service";

export default function Feed() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data } =
    useActiveSiedsPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  const _allSied = data?.pages.map((page) => page.data).flat();

  return (
    <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {_allSied?.map((sied: Sied, i: number) => {
        if (i === _allSied.length - 1)
          return (
            <div ref={ref} key={sied.id}>
              <SiedCard {...sied} />
            </div>
          );
        return (
          <div key={sied.id}>
            <SiedCard {...sied} />
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import Sied from "@/src/models/sied";
import SCard from "./card";

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

  const _allSied = data?.pages.map((page: any) => page.data).flat();

  return (
    <>
      {_allSied?.map((sied: Sied, i: number) => {
        if (i === _allSied.length - 1)
          return (
            <div ref={ref} key={sied.id} className="w-full h-full">
              <SCard key={sied.id} data={sied} update={update} />
            </div>
          );
        return (
          <div key={sied.id} className="w-full h-full">
            <SCard key={sied.id} data={sied} update={update} />
          </div>
        );
      })}
    </>
  );
}

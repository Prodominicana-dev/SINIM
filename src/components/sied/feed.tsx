"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import SiedCard from "./card";
import Sied from "@/src/models/sied";
import {
  useActiveSiedsPage,
  usePublicSiedsPage,
} from "@/src/services/sied/service";
import NotFound from "../validate/notFound";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAtom } from "jotai";
import { siedAtom } from "@/src/state/states";

export default function Feed() {
  const { isLoading } = useUser();
  const { fetchNextPage, hasNextPage, data: dataAll } = useActiveSiedsPage();
  const {
    fetchNextPage: fetchNextPagePublic,
    hasNextPage: hasNextPagePublic,
    data,
  } = usePublicSiedsPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const [canSeeSieds] = useAtom(siedAtom);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (dataAll && data && !isLoading) {
      canSeeSieds
        ? setFilteredData(dataAll?.pages.map((page) => page.data).flat())
        : setFilteredData(data?.pages.map((page) => page.data).flat());
    }
  }, [canSeeSieds, dataAll, data, isLoading]);

  useEffect(() => {
    if (hasNextPage && entry?.isIntersecting) fetchNextPage();
  }, [entry, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (hasNextPagePublic && entry?.isIntersecting) fetchNextPagePublic();
  }, [entry, fetchNextPagePublic, hasNextPagePublic]);

  return (
    <>
      {filteredData?.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredData?.map((sied: Sied, i: number) => {
              if (i === filteredData.length - 1)
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
        </>
      )}
    </>
  );
}

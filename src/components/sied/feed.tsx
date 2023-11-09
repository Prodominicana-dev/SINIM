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

export default function Feed() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: dataAll,
  } = useActiveSiedsPage();
  const {
    fetchNextPage: fetchNextPagePublic,
    hasNextPage: hasNextPagePublic,
    isFetchingNextPage: isFetchingNextPagePublic,
    data,
  } = usePublicSiedsPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  const [canSeeSieds, setCanSeeSieds] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (
      localStorage.getItem("sied") &&
      localStorage.getItem("sied") === "true"
    ) {
      setCanSeeSieds(true);
    } else {
      setCanSeeSieds(false);
    }
  }, []);

  useEffect(() => {
    if (dataAll && data) {
      canSeeSieds
        ? setFilteredData(dataAll?.pages.map((page) => page.data).flat())
        : setFilteredData(data?.pages.map((page) => page.data).flat());
    }
  }, [canSeeSieds, dataAll, data]);

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

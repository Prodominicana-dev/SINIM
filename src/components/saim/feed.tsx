"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";
import SaimCard from "./card";
import Saim from "@/src/models/saim";
import {
  useActiveSaimsPage,
  usePublicSaimsPage,
} from "@/src/services/saim/service";
import NotFound from "../validate/notFound";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Feed() {
  const { user, isLoading } = useUser();
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data: dataAll,
  } = useActiveSaimsPage();
  const {
    fetchNextPage: fetchNextPagePublic,
    hasNextPage: hasNextPagePublic,
    isFetchingNextPage: isFetchingNextPagePublic,
    data,
  } = usePublicSaimsPage();
  const containerRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  const [canSeeSaims, setCanSeeSaims] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    if (
      localStorage.getItem("saim") &&
      localStorage.getItem("saim") === "true"
    ) {
      setCanSeeSaims(true);
    } else {
      setCanSeeSaims(false);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (dataAll && data) {
      canSeeSaims
        ? setFilteredData(dataAll?.pages.map((page) => page.data).flat())
        : setFilteredData(data?.pages.map((page) => page.data).flat());
    }
  }, [canSeeSaims, dataAll, data]);

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
            {filteredData?.map((saim: Saim, i: number) => {
              if (i === filteredData.length - 1)
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
        </>
      )}
    </>
  );
}

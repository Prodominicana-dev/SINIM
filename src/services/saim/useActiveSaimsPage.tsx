import axios from "axios";
import Saim from "@/src/models/saim";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useActiveSaimsPage() {
  return useInfiniteQuery(
    ["saimsActivePage"],
    async ({ pageParam = 1 }) => {
      const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/page/${pageParam}`;
      const { data } = await axios.get(saimEndpoint);
      return data.data.map((item: Saim) => item);
    },
    {
      getNextPageParam: (_: any, pages: string | any[]) => {
        return pages.length + 1;
      },
    }
  );
}

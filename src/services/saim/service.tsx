import Saim from "@/src/models/saim";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useActiveSaims() {
  return useQuery(["activeSaims"], async () => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim`;
    const { data } = await axios.get(saimEndpoint);
    return data.map((item: Saim) => item);
  });
}

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

export function useSaim(id: number) {
  return useQuery(["saim", id], async () => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/${id}`;
    const { data } = await axios.get(saimEndpoint);
    return data;
  });
}

export default function useSaims() {
  return useQuery(["saims"], async () => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/all`;
    const { data } = await axios.get(saimEndpoint);
    return data.map((item: Saim) => item);
  });
}

export function useSaimsPage() {
  return useInfiniteQuery(
    ["saimsPage"],
    async ({ pageParam = 1 }) => {
      const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/page/all/${pageParam}`;
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

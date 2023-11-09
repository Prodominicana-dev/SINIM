import Saim from "@/src/models/saim";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useActiveSaims() {
  return useQuery({
    queryKey: ["Saims"],
    queryFn: async () => {
      const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim`;
      const { data } = await axios.get(saimEndpoint);
      return data.map((item: Saim) => item);
    },
  });
}

export function useActiveSaimsPage() {
  const fetchActiveSaimsData = async (pageParam: any) => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/page/${pageParam}`;
    const { data } = await axios.get(saimEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["activeSaims"],
    queryFn: ({ pageParam }) => fetchActiveSaimsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function usePublicSaimsPage() {
  const fetchActiveSaimsData = async (pageParam: any) => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/page/public/${pageParam}`;
    const { data } = await axios.get(saimEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["publicSaims"],
    queryFn: ({ pageParam }) => fetchActiveSaimsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useSaim(id: number) {
  return useQuery({
    queryKey: ["saim", id],
    queryFn: async () => {
      const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/${id}`;
      const { data } = await axios.get(saimEndpoint);
      return data;
    },
  });
}

export default function useSaims() {
  return useQuery({
    queryKey: ["saims"],
    queryFn: async () => {
      const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/all`;
      const { data } = await axios.get(saimEndpoint);
      return data.map((item: Saim) => item);
    },
  });
}

export function useSaimsPage() {
  const fetchSaimsData = async (pageParam: any) => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/page/all/${pageParam}`;
    const { data } = await axios.get(saimEndpoint);
    return data;
  };

  return useInfiniteQuery({
    queryKey: ["saimsPage"],
    queryFn: ({ pageParam }) => fetchSaimsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useSaimsCategory() {
  return useQuery({
    queryKey: ["saimscategory"],
    queryFn: async () => {
      const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/category/saim`;
      const { data } = await axios.get(saimEndpoint);
      return data;
    },
  });
}

import Sied from "@/src/models/sied";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useActiveSieds() {
  return useQuery({
    queryKey: ["Sieds"],
    queryFn: async () => {
      const siedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sied`;
      const { data } = await axios.get(siedEndpoint);
      return data.map((item: Sied) => item);
    },
  });
}

export function useActiveSiedsPage() {
  const fetchActiveSiedsData = async (pageParam: any) => {
    const siedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sied/page/${pageParam}`;
    const { data } = await axios.get(siedEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["activeSieds"],
    queryFn: ({ pageParam }) => fetchActiveSiedsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function usePublicSiedsPage() {
  const fetchActiveSiedsData = async (pageParam: any) => {
    const siedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sied/page/public/${pageParam}`;
    const { data } = await axios.get(siedEndpoint);
    return data;
  };
  return useInfiniteQuery({
    queryKey: ["publicSieds"],
    queryFn: ({ pageParam }) => fetchActiveSiedsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useSied(id: number) {
  return useQuery({
    queryKey: ["sied", id],
    queryFn: async () => {
      const siedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sied/${id}`;
      const { data } = await axios.get(siedEndpoint);
      return data;
    },
  });
}

export function useSieds() {
  return useQuery({
    queryKey: ["sieds"],
    queryFn: async () => {
      const siedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sied/all`;
      const { data } = await axios.get(siedEndpoint);
      return data.map((item: Sied) => item);
    },
  });
}

export function useSiedsPage() {
  const fetchSiedsData = async (pageParam: any) => {
    const siedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/sied/page/all/${pageParam}`;
    const { data } = await axios.get(siedEndpoint);
    return data;
  };

  return useInfiniteQuery({
    queryKey: ["siedsPage"],
    queryFn: ({ pageParam }) => fetchSiedsData(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.meta.next,
  });
}

export function useSiedsCategory() {
  return useQuery({
    queryKey: ["siedscategory"],
    queryFn: async () => {
      const siedEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/category/sied`;
      const { data } = await axios.get(siedEndpoint);
      return data;
    },
  });
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rami from "@/src/models/rami";

export function useRami(id: number) {
  return useQuery({
    queryKey: ["rami", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/rami/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useRamis() {
  return useQuery({
    queryKey: ["ramis"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/rami`;
      const { data } = await axios.get(url);
      return data.map((item: Rami) => item);
    },
  });
}

export function useRamisSettings() {
  return useQuery({
    queryKey: ["ramisSettings"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/rami/settings`;
      const { data } = await axios.get(url);
      return data.map((item: Rami) => item);
    },
  });
}

export function deleteRami(id: number) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/rami/${id}`);
}

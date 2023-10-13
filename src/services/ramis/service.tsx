import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rami from "@/src/models/rami";

export function useRami(id: number) {
  return useQuery(["rami"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rami/${id}`;
    const { data } = await axios.get(url);
    return data;
  });
}

export function useRamis() {
  return useQuery(["ramis"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rami`;
    const { data } = await axios.get(url);
    return data.map((item: Rami) => item);
  });
}

export default function useRamisSettings() {
  return useQuery(["ramisSettings"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rami/settings`;
    const { data } = await axios.get(url);
    return data.map((item: Rami) => item);
  });
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Sector from "@/src/models/sector";

export function useSectors() {
  return useQuery(["sectors"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sector`;
    const { data } = await axios.get(url);
    return data.map((item: Sector) => item);
  });
}

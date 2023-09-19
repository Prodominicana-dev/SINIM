import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rami from "@/src/models/rami";

export default function useRami(id: number) {
  return useQuery(["rami"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rami/${id}`;
    const { data } = await axios.get(url);
    return data;
  });
}

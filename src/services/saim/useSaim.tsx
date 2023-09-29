import axios from "axios";
import Saim from "@/src/models/saim";
import { useQuery } from "@tanstack/react-query";

export default function useSaim(id: number) {
  return useQuery(["saim", id], async () => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/${id}`;
    const { data } = await axios.get(saimEndpoint);
    return data;
  });
}

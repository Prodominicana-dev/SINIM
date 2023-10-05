import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rami from "@/src/models/rami";

export default function useRamisSettings() {
  return useQuery(["ramisSettings"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rami/settings`;
    const { data } = await axios.get(url);
    return data.map((item: Rami) => item);
  });
}

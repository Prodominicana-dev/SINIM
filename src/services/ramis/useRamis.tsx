import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Rami from "@/src/models/rami";

export default function useRamis() {
  return useQuery(["ramis"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rami`;
    const { data } = await axios.get(url);
    return data.map((item: Rami) => item);
  });
}

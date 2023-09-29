import Saim from "@/src/models/saim";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useActiveSaims() {
  return useQuery(["activeSaims"], async () => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim`;
    const { data } = await axios.get(saimEndpoint);
    return data.map((item: Saim) => item);
  });
}

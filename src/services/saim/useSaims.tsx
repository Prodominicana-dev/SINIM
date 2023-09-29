import Saim from "@/src/models/saim";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSaims() {
  return useQuery(["saims"], async () => {
    const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/all`;
    const { data } = await axios.get(saimEndpoint);
    return data.map((item: Saim) => item);
  });
}

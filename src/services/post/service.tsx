import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePosts() {
  return useQuery({
    queryKey: ["post"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/post`;
      const { data } = await axios.get(url);
      return data.map((item: any) => item);
    },
  });
}


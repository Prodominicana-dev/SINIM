import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "@/src/models/product";

export function useProduct(id: number) {
  return useQuery(["product"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`;
    const { data } = await axios.get(url);
    return data;
  });
}

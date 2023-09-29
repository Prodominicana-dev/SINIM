import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "@/src/models/product";

export function useProducts() {
  return useQuery(["products"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const { data } = await axios.get(url);
    return data.map((item: Product) => item);
  });
}

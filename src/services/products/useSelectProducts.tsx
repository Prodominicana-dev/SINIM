import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "@/src/models/product";

export function useSelectProducts() {
  return useQuery(["selectProducts"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products/select`;
    const { data } = await axios.get(url);
    return data.map((item: Product) => item);
  });
}

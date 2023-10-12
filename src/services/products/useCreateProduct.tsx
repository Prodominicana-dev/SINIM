import Product from "@/src/models/product";
import axios from "axios";

export default function useCreateProduct(data: Product) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}`, data);
}

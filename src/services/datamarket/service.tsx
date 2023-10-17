import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DataMarket from "@/src/models/datamarket";

export function useDataMarkets() {
  return useQuery(["datamarkets"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket`;
    const { data } = await axios.get(url);
    return data.map((item: DataMarket) => item);
  });
}

export function useDataMarketsCategories() {
  return useQuery(["datamarketsCategories"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/group/category`;
    const { data } = await axios.get(url);
    return data;
  });
}

export function useDataMarketsByCategory(category: string) {
  return useQuery(["datamarketsCategories"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/category/${category}`;
    const { data } = await axios.get(url);
    return data;
  });
}

export function useDataMarket(id: number) {
  return useQuery(["datamarket"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/datamarket/${id}`;
    const { data } = await axios.get(url);
    return data;
  });
}

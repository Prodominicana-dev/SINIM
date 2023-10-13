import country from "@/src/models/country";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCountries() {
  return useQuery(["countries"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/countries`;
    const { data } = await axios.get(url);
    return data.map((item: country) => item);
  });
}

export function useSelectCountries() {
  return useQuery(["selectCountries"], async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/countries/select`;
    const { data } = await axios.get(url);
    return data.map((item: country) => item);
  });
}

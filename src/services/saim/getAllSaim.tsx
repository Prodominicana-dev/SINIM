import Saim from "@/src/models/saim";
import { data } from "autoprefixer";
import axios from "axios";

export default async function getAllSaim(page: number): Promise<Saim[]> {
  const saimEndpoint = `http://localhost:3001/saim/page/${page}`;
  const response = await axios.get(saimEndpoint);
  const saimData = response.data.data;
  const dataArray = saimData.map((item: Saim) => item);
  return dataArray;
}

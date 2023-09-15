import Saim from "@/src/models/saim";
import axios from "axios";

export default async function getPaginatedSaim(page: number): Promise<Saim[]> {
  const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim/page/${page}`;
  const response = await axios.get(saimEndpoint);
  const saimData = response.data.data;
  const dataArray = saimData.map((item: Saim) => item);
  return dataArray;
}

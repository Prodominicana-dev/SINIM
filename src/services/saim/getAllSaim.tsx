import Saim from "@/src/models/saim";
import axios from "axios";

export default async function getAllSaim(): Promise<Saim[]> {
  const saimEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/saim`;
  console.log(saimEndpoint)
  const response = await axios.get(saimEndpoint);
  const saimData = response.data;
  const dataArray = saimData.map((item: Saim) => item);
  return dataArray;
}

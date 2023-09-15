import Saim from "@/src/models/saim";
import axios from "axios";

export default async function getAllSaim(): Promise<Saim[]> {
  const saimEndpoint = `http://127.0.0.1:3001/saim`;
  const response = await axios.get(saimEndpoint);
  const saimData = response.data;
  const dataArray = saimData.map((item: Saim) => item);
  return dataArray;
}

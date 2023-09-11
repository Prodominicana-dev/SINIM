import Saim from "@/src/models/saim";
import { data } from "autoprefixer";
import axios from "axios";

export default async function getAllSaim(): Promise<Saim[]> {
  const saimEndpoint =
    "https://sinim-api-git-tools-prodominicanadev.vercel.app/saim";
  const response = await axios.get(saimEndpoint);
  const saimData = response.data;
  const dataArray = saimData.map((item: Saim) => item);
  return dataArray;
}

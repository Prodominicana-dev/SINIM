import Saim from "@/src/models/saim";
import { data } from "autoprefixer";
import axios from "axios";

export default async function getSaim(id: string): Promise<Saim> {
  const saimEndpoint = `https://sinim-api-git-tools-prodominicanadev.vercel.app/saim/${id}`;
  const response = await axios.get(saimEndpoint);
  const saimData = response.data;
  return saimData;
}

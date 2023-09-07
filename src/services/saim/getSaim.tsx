import { data } from "autoprefixer";
import axios from "axios";

interface SaimData {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  link: string;
  image: string;
  date: Date;
}

export default async function getSaim(id: string): Promise<SaimData> {
  const saimEndpoint = `https://sinim-api-git-tools-prodominicanadev.vercel.app/saim/${id}`;
  const response = await axios.get(saimEndpoint);
  const saimData = response.data;
  return saimData;
}

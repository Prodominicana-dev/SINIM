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

export default async function getData(): Promise<SaimData[]> {
  const saimEndpoint =
    "https://sinim-api-git-tools-prodominicanadev.vercel.app/saim";
  const response = await axios.get(saimEndpoint);
  const saimData = response.data;
  const dataArray = saimData.map((item: SaimData) => item);
  return dataArray;
}

import country from "./country";
import product from "./product";

export default interface Saim {
  id: number;
  title: string;
  description: string;
  category: string;
  source: string;
  link: string;
  image: string;
  date: Date;
  status: string;
  countries: country[];
  products: product[];
}

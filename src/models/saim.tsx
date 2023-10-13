import country from "./country";
import product from "./product";

export default interface Saim {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  date: Date;
  status: string;
  published: boolean;
  countries: country[];
  products: product[];
}

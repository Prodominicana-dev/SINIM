import product from '@/src/models/product';
import axios from 'axios'

export default async function getProducts() : Promise<product> { 
    const url = `http://127.0.0.1:3001/products`;
    const response = await axios.get(url);
    const products = response.data;
    const data = products.map((item: product) => item);
    return data;
}

import product from '@/src/models/product';
import axios from 'axios'

export default async function getProducts() : Promise<product> { 
    const saimEndpoint = `http://127.0.0.1:3001/products`;
    const response = await axios.get(saimEndpoint);
    const products = response.data;
    const data = products.map((item: product) => item);
    return data;
}

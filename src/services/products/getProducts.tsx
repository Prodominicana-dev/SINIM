import Product from '@/src/models/product';
import axios from 'axios'

export default async function getProducts() : Promise<any[]> { 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/products`;
    const response = await axios.get(url);
    const products = response.data;
    const data = products.map((item: any) => {
        item
    });
    return data;
}

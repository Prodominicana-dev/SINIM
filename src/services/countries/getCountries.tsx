import country from '@/src/models/country';
import axios from 'axios'

export default async function getCountries() : Promise<country> { 
    const saimEndpoint = `http://127.0.0.1:3001/countries`;
    const response = await axios.get(saimEndpoint);
    const products = response.data;
    const data = products.map((item: country) => item);
    return data;
}

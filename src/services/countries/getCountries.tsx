import country from '@/src/models/country';
import axios from 'axios'

export default async function getCountries() : Promise<country> { 
    const url = `http://127.0.0.1:3001/countries`;
    const response = await axios.get(url);
    const countries = response.data;
    const data = countries.map((item: country) => item);
    return data;
}

import Country from '@/src/models/country';
import axios from 'axios'

export default async function getCountries() : Promise<Country[]> { 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/countries`;
    const response = await axios.get(url);
    const countries = response.data;
    const data = countries.map((item: Country) => item);
    return data;
}

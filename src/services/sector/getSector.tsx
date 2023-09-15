
import sector from '@/src/models/sector';
import axios from 'axios'

export default async function getCountries() : Promise<sector> { 
    const url = `http://127.0.0.1:3001/sector`;
    const response = await axios.get(url);
    const sector = response.data;
    const data = sector.map((item: sector) => item);
    return data;
}

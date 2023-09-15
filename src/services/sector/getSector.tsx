
import sector from '@/src/models/sector';
import axios from 'axios'

export default async function getSector() : Promise<sector> { 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sector`;
    const response = await axios.get(url);
    const sector = response.data;
    const data = sector.map((item: sector) => item);
    return data;
}

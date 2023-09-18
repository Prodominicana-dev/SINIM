
import Sector from '@/src/models/sector';
import axios from 'axios'

export default async function getSector() : Promise<Sector[]> { 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/sector`;
    const response = await axios.get(url);
    const sector = response.data;
    const data = sector.map((item: Sector) => item);
    return data;
}

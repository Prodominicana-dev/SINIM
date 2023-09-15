
import rami from '@/src/models/rami';
import axios from 'axios'

export default async function getRamis() : Promise<rami> { 
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rami`;
    const response = await axios.get(url);
    const ramis = response.data;
    const data = ramis.map((item: rami) => item);
    return data;
}

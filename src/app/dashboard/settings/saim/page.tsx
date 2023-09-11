"use client";
import Saim from '@/src/models/saim';
import getAllSaim from '@/src/services/saim/getAllSaim';
import {useCallback, useState, useEffect} from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip, Typography } from "@material-tailwind/react";
import { PlusIcon, PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import SCard from '@/src/components/settings/saim/card';

export default function Page() {
    const [data, setData] = useState<Saim[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await getAllSaim();
          setData(response);
        };
        fetchData();
      }, []);
  return (
    <div className='flex flex-col justify-center items-center '>
        <div className="w-11/12 h-full flex flex-col justify-center items-center my-10">
            <div className=" w-8/12 flex flex-row justify-between items-center">
                <Button variant="outlined" className="rounded-full w-44 hover:bg-gray-200 duration-300 cursor-pointer">Oportunidades</Button>
                <Button variant="outlined" className="rounded-full w-44 cursor-pointer">Actualizaciones</Button>
                <Button variant="outlined" className="rounded-full w-44 cursor-pointer">Amenazas</Button>
                <Button variant="outlined" className="rounded-full w-44 cursor-pointer">Obstáculos</Button>
            </div>
            {/* 
               SAIMS
            */}
            <div className='w-full h-[28rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 p-10'>
                <Link className='w-full h-full flex justify-center items-center rounded-3xl border-2 border-dashed border-black cursor-pointer hover:bg-gray-200 duration-300' href={''}>
                    <PlusIcon className='w-16 h-16 text-black'/>
                </Link>
                {data.map((saim) => (
                    <div className='w-full h-full'>
                        <SCard key={saim.id} {...saim}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

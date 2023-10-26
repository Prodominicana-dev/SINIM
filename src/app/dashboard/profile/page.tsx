"use client"
import IsLogged from '@/src/components/validate/logged'
import { useUser } from '@auth0/nextjs-auth0/client';
import { Avatar, Input, Option, Select, Typography } from '@material-tailwind/react'
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useState } from 'react';

export default function page() {
    const {user} = useUser();
    const [typeDocumentation, setTypeDocumentation] = useState('');
    const [documentation, setDocumentation] = useState('');
    const [createdAt, setCreatedAt] = useState<Date | null>(new Date());

    useEffect(() => {
        setCreatedAt(user?.updated_at ? new Date(user?.updated_at) : new Date());
    }, [user])
    
  return (
    <IsLogged>
        <div className='flex justify-center'>
        <div className='flex flex-col w-10/12 py-8 sm:w-8/12 xl:w-4/12 space-y-14'>
            <div className='w-full'>
                <h1 className='text-3xl font-bold text-black lg:text-4xl'>Perfíl</h1>
                <p className='text-base font-thin text-gray-400 lg:text-lg'>Completa tu perfil para disfrutar de una experiencia más completa en nuestra plataforma.</p>
            </div>
            <div className='flex flex-col w-full space-y-4 sm:flex-row sm:space-y-0'>
                <div className='flex justify-center w-full sm:w-6/12'>
                <Avatar
                        variant="circular"
                        size="lg"
                        className="w-32 h-32 sm:w-48 sm:h-48"
                        src={user?.picture as string}
                        
                        />
                </div>
                <div className='flex items-center justify-center w-full sm:justify-start sm:w-6/12'>
                    <div>
                        <Typography className="text-2xl font-bold text-center sm:text-left sm:text-3xl text-navy">
                        {user?.name}
                        </Typography>
                        <Typography className="text-xs font-thin text-center text-gray-400 sm:text-left sm:text-base">
                        Miembro desde {format(new Date(createdAt), "MMMM yyyy", { locale: es })}
                        </Typography>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center justify-center w-full space-y-4 sm:space-y-10'>
                <div className='flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row'>
                    <div className="w-full sm:w-6/12">
                        <Input label="Nombre" crossOrigin={""} />
                    </div>
                    <div className="w-full sm:w-6/12">
                        <Input label="Apellido" crossOrigin={""} />
                    </div>
                </div>
                <div className='flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row'>
                    <div className="w-full sm:w-6/12">
                        <Input label="Correo electrónico" type='email' crossOrigin={""} />
                    </div>
                    <div className="w-full sm:w-6/12">
                        <Input label="Teléfono" crossOrigin={""} />
                    </div>
                </div>
                <div className='flex flex-col w-full space-y-4 sm:space-y-0 sm:space-x-4 sm:flex-row'>
                    <div className="w-full sm:w-6/12">
                    <Select label="Documento" onChange={(e) => setTypeDocumentation(e ? e : "")}>
                        <Option value='cedula'>Cédula</Option>
                        <Option value='pasaporte'>Pasaporte</Option>
                    </Select>
                    </div>
                    <div className="w-full sm:w-6/12">
                        <Input label={typeDocumentation === "cedula" ? "Cédula" : typeDocumentation === "pasaporte" ? "Pasaporte" : ''} crossOrigin={""} 
                        disabled={typeDocumentation === ''} 
                        value={documentation}
                        minLength={typeDocumentation === "cedula" ? 10 : 9}
                        maxLength={typeDocumentation === "cedula" ? 10 : 9}
                        onChange={(e) =>  setDocumentation(e.target.value)}/>
                    </div>
                </div>
                <div className='flex flex-col w-full space-x-4 sm:flex-row'>
                    <div className="w-full">
                        <Input label="Dirección" type='text' crossOrigin={""} />
                    </div>
                </div>
                <button className='w-full text-lg font-semibold text-center text-white duration-200 rounded-lg h-14 bg-navy hover:text-white/80 hover:bg-navy/80'>Guardar</button>
            </div>

        </div>
        </div>
        
    </IsLogged>
  )
}

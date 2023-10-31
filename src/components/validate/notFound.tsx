import React from 'react'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-[50vh] px-4 py-12 space-y-8 sm:p-12' >
    <img src="/images/logo/not found.svg" className='w-full h-52' alt="svg" />
    <div className='text-3xl font-bold text-black'>No se encuentran resultados de su búsqueda</div>
</div>
  )
}
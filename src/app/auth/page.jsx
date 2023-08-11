import Background from '@/src/components/home/background'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <>
      <Background video={'/videos/rami.mp4'} color={'bg-gradient-to-l from-blue-700 from-[40%] to-sky-500/70'} />
      <div className='w-full h-screen'>
        <div className='w-6/12 h-full ml-auto flex flex-col justify-center items-center'>
          <div>

          <Image
          src={'/images/logo/sinim.png'}
          width={500}
          height={500}
          draggable={false}
          alt=""
          className="w-full "
        />
          </div>
        
        </div>
      </div>
    </>
    

  )
}

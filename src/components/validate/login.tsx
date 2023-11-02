import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Login() {
    const pathname = usePathname()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <>
    <div className='flex flex-col items-center justify-center px-4 py-12 space-y-8 sm:p-12 w-full h-[90vh]'>
        <img src="/images/logo/accessDenied.svg" className='w-full h-52' alt="svg" />
        <div className='text-3xl font-bold text-black'>Acceso restringido</div>
        <div className='w-11/12 text-lg font-normal text-left text-gray-500 sm:text-center sm:w-8/12 xl:w-4/12'>Se requiere inicio de sesión para acceder a esta área, donde encontrarás contenido exclusivo y beneficios adicionales solo disponibles para nuestros usuarios registrados.</div>
        <Link href={`/api/auth/login?returnTo=${baseUrl}${pathname}`} className='flex items-center justify-center w-56 h-10 text-white rounded-lg shadow-sm bg-navy'>Iniciar sesión</Link>
    </div>
    </>
  )
}
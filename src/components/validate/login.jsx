"use client"
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/navigation';

export default function IsLogged({children}) {
    const router = useRouter()
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (user){
        <div>Bienvenido, {user.name}.</div>
    }
    return router.push('/api/auth/login');
}
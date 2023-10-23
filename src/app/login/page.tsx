"use client"
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Page() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo'); 

  return (
    <Link href={`/api/auth/login?returnTo=${returnTo}`}>Iniciar sesión</Link>
  );
}
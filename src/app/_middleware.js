import {NextRequest, NextResponse} from 'next/server';
import {useUser} from '@auth0/nextjs-auth0/client';

export default function middleware(handler) {
  return async (req, res) => {
    const {user} = useUser({req});
    console.log('entro al middleware');

    if (!user) {
      console.log('el usuario no existe');
      res.writeHead(307, {Location: '/api/auth/login'});
      res.end();
      return;
    }

    return handler(req, res);
  };
}
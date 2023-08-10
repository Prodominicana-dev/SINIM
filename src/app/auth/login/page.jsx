'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0/dist/auth0-session";

export default function Page() {
  // const login = async (req, res) => {
  //   await handleLogin(req, res, {
  //     returnTo: "/registration",
  //   });
  // }
  const { user, error, isLoading, } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        {user.sub} <a  href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <button onClick={handleLogin("/api/auth/login","",{returnTo: "/registration"})}>Login</button>;
}


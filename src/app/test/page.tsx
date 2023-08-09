"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
    <div className="flex justify-center items-center bg-blue-600 h-screen">
      {status === "loading" ? (
        <p>Cargando..</p>
      ) : session ? (
        <pre>{JSON.stringify(session, null, 2)}</pre>
      ) : (
        <h1 className="text-5xl">NO SE PUEDE MIO</h1>
      )}
    </div>
  );
}

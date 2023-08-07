import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackurl=/signin");
    },
  });

  return (
    <div className="bg-indigo-600 h-screen flex justify-center items-center">
      <h1 className="text-white text-7xl">{session?.user?.name}</h1>
    </div>
  );
}

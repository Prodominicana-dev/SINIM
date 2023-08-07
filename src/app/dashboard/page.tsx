import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import React from "react";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("api/auth/signin?callbackUrl=/dashboard");
  }
  return (
    <div className="bg-indigo-600 h-screen flex justify-center items-center">
      <h1 className="text-white text-7xl">{session?.user?.name}</h1>
    </div>
  );
}

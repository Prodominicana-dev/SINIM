"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/test");
    },
  });
  return (
    <div className="bg-indigo-600 h-screen flex justify-center items-center">
      <h1 className="text-white text-7xl">{session?.user?.name}</h1>
    </div>
  );
}

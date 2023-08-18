"use client";
import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="bg-indigo-500 h-screen flex items-center justify-center">
      <Spinner className="w-16 h-16" />
    </div>
  );
}

"use client";
import { useDataMarket } from "@/src/services/datamarket/service";
import React from "react";

export default function Page({ params }: { params: { id: number } }) {
  const { data }: any = useDataMarket(params.id);
  return (
    <div className="w-full sm:px-10 py-5 h-[88vh] flex items-center justify-center">
      <iframe
        className="w-full h-full"
        title="Report Section"
        src={data?.url}
        allowFullScreen={false}
      ></iframe>
    </div>
  );
}

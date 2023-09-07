import getSaim from "@/src/services/saim/getsaim";
import axios from "axios";
import React from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const saim = await getSaim(params.id);
  return <div></div>;
}

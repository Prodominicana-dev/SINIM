"use client";

import React from "react";
import getSaim from "@/src/services/saim/getSaim";
import Modal from "@/src/components/saim/Modal/Modal";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getSaim(params.id);
  return <Modal data={data} />;
}

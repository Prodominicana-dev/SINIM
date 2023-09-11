"use client";

import React from "react";
import getSaim from "@/src/services/saim/getSaim";
import Modal from "@/src/components/saim/Modal/Modal";

export default function Page({ params }: { params: { id: string } }) {
  return <Modal id={params.id} />;
}

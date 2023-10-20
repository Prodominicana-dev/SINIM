"use client";

import React from "react";
import Modal from "@/src/components/sied/Modal/Modal";

export default function Page({ params }: { params: { id: number } }) {
  return <Modal id={params.id} />;
}

"use client";
import Modal from "@/src/components/saim/Modal/Modal";
import React from "react";

export default function Page({ params }: { params: { id: number } }) {
  return <Modal id={params.id} />;
}

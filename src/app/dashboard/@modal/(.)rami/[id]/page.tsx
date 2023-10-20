import Modal from "@/src/components/rami/modal/Modal";
import React from "react";

export default function Page({ params }: { params: { id: number } }) {
  return <Modal id={params.id} />;
}

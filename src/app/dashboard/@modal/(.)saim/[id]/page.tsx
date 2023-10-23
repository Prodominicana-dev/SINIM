"use client";
import Modal from "@/src/components/saim/Modal/Modal";

export default function Page({ params }: { params: { id: number } }) {
  return <Modal id={params.id} />;
}

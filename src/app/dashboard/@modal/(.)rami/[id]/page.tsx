import Modal from "@/src/components/rami/modal/Modal";

export default function Page({ params }: { params: { id: number } }) {
  return <Modal id={params.id} />;
}

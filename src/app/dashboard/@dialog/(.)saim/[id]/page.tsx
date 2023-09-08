"use client";

import React from "react";
import getSaim from "@/src/services/saim/getSaim";
import { useRouter } from "next/navigation";
import SaimDialog from "@/src/components/saim/Dialog/Dialog";

export default async function Page({ params }: { params: { id: string } }) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const data = await getSaim(params.id);

  const handler = () => {
    if (!open) {
      router.back();
    }
  };
  return <SaimDialog handler={handler} data={data} />;
}

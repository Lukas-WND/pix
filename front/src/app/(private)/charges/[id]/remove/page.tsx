"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";

export default function RemoveChargePage() {
  const router = useRouter();
  const { id } = useParams();

  
  return (
    <section>
      remove page do id: {id}
    </section>
  );
}

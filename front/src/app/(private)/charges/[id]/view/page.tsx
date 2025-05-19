"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";

export default function ViewChargePage() {
  const router = useRouter();
  const { id } = useParams();


  
  return (
    <section>
      view page do id: {id}
    </section>
  );
}

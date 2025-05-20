"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useParams, useRouter } from "next/navigation";

export default function PaymentChargePage() {
  const router = useRouter();
  const { id } = useParams();

  
  return (
    <section>
      simulate payment page do id: {id}
    </section>
  );
}

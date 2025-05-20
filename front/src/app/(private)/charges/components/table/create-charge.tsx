import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateChargeLink() {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/charges/create")}>
      <PlusCircleIcon className="size-4" />
      <span>Nova cobrança</span>
    </Button>
  );
}

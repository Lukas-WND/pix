import { Badge } from "@/components/ui/badge";

enum Status {
  CREATED = 0,
  EXPIRED = 1,
  PAID = 2,
  CREDITED = 3,
}

export function ChargeStatus({ status }: { status: Status }) {
  const style = [
    {
      colorClass: "text-amber-600",
      dotClass: "bg-amber-600",
      text: "Pendente",
    },
    {
      colorClass: "text-red-600",
      dotClass: "bg-red-600",
      text: "Expirado",
    },
    {
      colorClass: "text-green-600",
      dotClass: "bg-green-600",
      text: "Pago",
    },
    {
      colorClass: "text-emerald-600",
      dotClass: "bg-emerald-600",
      text: "Creditado",
    },
  ];

  const currentStyle = style[status];

  return (
    <Badge variant="outline" className="flex items-center gap-2 py-1 px-5">
      <span
        className={`w-2 h-2 rounded-full ${currentStyle.dotClass} animate-pulse`}
      ></span>
      <p className={`${currentStyle.colorClass}`}>{currentStyle.text}</p>
    </Badge>
  );
}

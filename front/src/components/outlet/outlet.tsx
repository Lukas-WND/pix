"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

import { Toaster } from "sonner";

export function Outlet({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      {children}
    </QueryClientProvider>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns | Amazing Natures",
  description: "Information about shipping rates, delivery times, and our returns policy for Australian Manuka honey.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

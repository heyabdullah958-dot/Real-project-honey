import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Amazing Natures",
  description: "Read the terms and conditions for using the Amazing Natures website and purchasing our premium Manuka honey.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

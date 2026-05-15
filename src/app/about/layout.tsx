import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Amazing Natures",
  description: "Born from the Australian wilderness. Discover the journey of Amazing Natures and our commitment to ethical harvesting and bioactive purity.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

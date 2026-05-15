import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Amazing Natures",
  description: "Your privacy is important to us. Learn how Amazing Natures collects, uses, and protects your personal information.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

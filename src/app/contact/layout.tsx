import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Amazing Natures",
  description: "Get in touch with our wellness experts. Have questions about our premium Manuka honey grades or your order? We're here to help.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wellness Quiz | Amazing Natures",
  description: "Find your perfect MGO activity level with our personalized wellness quiz. Discover the amazing standard match for your lifestyle.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

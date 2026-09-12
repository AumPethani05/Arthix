import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arthix — Hyper-personalized banking for Bharat",
  description: "The right product. The right moment. Or no product at all.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

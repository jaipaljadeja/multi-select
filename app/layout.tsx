import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zepto.jaipaljadeja.com"),
  title: "Zepto - MultiSelect Implementaion",
  description: "Assignment for Zepto Frontend SDE-I",
  creator: "Jaipal Jadeja",
  publisher: "Jaipal Jadeja",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

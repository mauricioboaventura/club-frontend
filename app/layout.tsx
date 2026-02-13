import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Monte Carlo Poker Club",
  description: "Monte Carlo Poker Club - Experiência exclusiva em poker, gastronomia e entretenimento",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

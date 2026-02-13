import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Monte Carlo Poker Club",
  description:
    "Monte Carlo Poker Club - Experiência exclusiva em poker, gastronomia e entretenimento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

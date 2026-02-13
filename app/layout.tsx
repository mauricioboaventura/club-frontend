import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import SharedSections from "@/components/SharedSections";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
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
        <SharedSections />
        <BottomNav />
      </body>
    </html>
  );
}

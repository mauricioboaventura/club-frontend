import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import SharedSections from "@/components/SharedSections";
import Header from "@/components/Header";
import { fetchActiveRankings } from "@/lib/api/rankings";
import Script from "next/script";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allRankings = await fetchActiveRankings();
  const rankings = allRankings.map((r) => ({ id: r.id, name: r.name }));

  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased`}>
        <Header rankings={rankings} />
        {children}
        <SharedSections />
        <BottomNav />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N4QG5T87KL"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-N4QG5T87KL');
        `}</Script>
        <Script
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/e46f5ce2-3634-45e4-ade3-4151ca43fc3a-loader.js"
          strategy="afterInteractive"
        />
        <Script id="rdstation-fix" strategy="lazyOnload">{`
          (function() {
            if (window.innerWidth >= 1024) return;
            function applyFix() {
              var wrapper = document.querySelector('.floating-button[class*="rdstation-popup-position"]');
              if (!wrapper) return;
              wrapper.style.setProperty('bottom', '80px', 'important');
              var btn = wrapper.querySelector('.bricks--floating--button');
              if (btn) {
                btn.style.setProperty('bottom', '0px', 'important');
              }
            }
            var count = 0;
            var interval = setInterval(function() {
              applyFix();
              if (++count >= 50) clearInterval(interval);
            }, 300);
          })();
        `}</Script>
      </body>
    </html>
  );
}

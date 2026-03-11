"use client";

import { usePathname } from "next/navigation";
import { CtaSection } from "@/components/CtaSections";
import AccordionSection from "@/components/AccordionSection";
import AppDownload from "@/components/AppDownloadButton";
import Footer from "@/components/Footer";

export default function SharedSections() {
  const pathname = usePathname();

  if (pathname === "/auth" || pathname === "/explorar" || pathname === "/sigma-poker-tour") return null;

  return (
    <>
      {/* <CtaSection /> */}
      <AccordionSection />
      {/* <AppDownload /> */}
      <Footer />
    </>
  );
}

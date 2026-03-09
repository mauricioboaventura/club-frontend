"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Calendar, UtensilsCrossed } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  {
    href: "/poker",
    label: "Poker",
    icon: (
      <svg
        viewBox="0 0 1907.05 1900.48"
        fill="currentColor"
        className="h-5 w-5 shrink-0"
        aria-hidden="true"
      >
        <polygon points="1271.23 949.04 1154.7 1162.41 1071.4 1314.85 954.87 1528.36 837.61 1315.34 753.57 1162.9 635.82 949.04 729.95 777.32 752.11 736.86 752.18 736.73 835.66 584.66 835.73 584.53 857.97 543.95 952.42 371.64 1047.38 543.79 1119.03 413.28 1130.87 391.52 1118.55 369.2 951.93 67.49 786.55 369.2 774.1 392.08 751.94 432.82 751.86 432.95 668.39 585.02 668.32 585.15 646.16 625.61 468.97 949.04 468.73 949.04 647.7 1274.37 670.08 1314.99 670.15 1314.85 753.94 1467.29 753.87 1467.42 754.06 1467.77 776.27 1508.04 788.02 1529.34 955.36 1832.99 1121.23 1529.34 1133.03 1507.79 1155.19 1467.29 1155.26 1467.15 1155.07 1466.8 1238.37 1314.36 1238.57 1314.71 1260.78 1274.06 1438.32 949.04 1271.23 949.04"></polygon>
        <polygon points="623.78 1657.14 623.85 1657.01 553.39 1528.82 553.37 1528.85 540.03 1504.62 539.99 1504.71 517.61 1464.09 517.67 1463.98 234.57 949.04 235.06 949.04 550.94 372.13 646.03 544.5 717.6 414.14 729.53 392.21 716.57 368.71 550.45 67.98 385.79 368.71 67.97 949.04 67.24 949.04 386.04 1528.85 553.86 1833.48 637.09 1681.3 623.97 1657.5 623.78 1657.14"></polygon>
        <polygon points="1519.79 368.71 1353.18 67.01 1187.8 368.71 1153.36 431.98 1069.81 584.17 953.04 797.2 858.08 625.04 786.39 755.63 774.56 777.23 869.25 948.66 870.22 948.66 869.98 948.9 954.02 1101.34 1037.07 949.39 1036.58 948.66 1037.07 948.66 1153.6 735.88 1237.15 583.69 1353.67 371.15 1672.48 949.04 1371.14 1500.36 1371.15 1500.37 1348.93 1541.02 1348.74 1540.67 1272.58 1680.03 1356.61 1832.5 1522.48 1528.85 1839.57 949.04 1839.82 949.04 1519.79 368.71"></polygon>
      </svg>
    ),
  },
  { href: "/eventos", label: "Eventos", icon: Calendar },
  { href: "/gastronomia", label: "Gastronomia", icon: UtensilsCrossed },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname === "/auth") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 max-w-[480px] mx-auto pb-[var(--safe-bottom)] lg:hidden">
      <div className="flex items-center justify-around py-3 px-2 bg-white">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const isSvg = React.isValidElement(item.icon);
          const Icon = isSvg
            ? null
            : (item.icon as React.ComponentType<{
                size?: number;
                strokeWidth?: number;
              }>);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 min-w-[56px] py-1 transition-colors ${
                isActive ? "text-[#5A1C1C]" : "text-[#A0A0A0]"
              }`}
            >
              {isSvg ? (
                <span className="[&_svg]:h-[22px] [&_svg]:w-[22px] shrink-0">
                  {item.icon as React.ReactElement}
                </span>
              ) : Icon ? (
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              ) : null}
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

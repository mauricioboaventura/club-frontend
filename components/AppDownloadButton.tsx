import Link from "next/link";

const appStoreIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const googlePlayIcon = (
  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
  </svg>
);

const appLinks = [
  {
    smallText: "Download on the",
    mainText: "App Store",
    icon: appStoreIcon,
    href: "#",
  },
  {
    smallText: "GET IT ON",
    mainText: "Google Play",
    icon: googlePlayIcon,
    href: "#",
  },
];

export default function AppDownloadSection() {
  return (
    <div className="px-4 py-8 border-b border-white/10 bg-[#2a0303]">
      <h3 className="font-semibold text-white mb-4">Baixe o app Monte Carlo</h3>
      <div className="flex gap-3">
        {appLinks.map((app) => (
          <Link
            key={app.mainText}
            href={app.href}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            {app.icon}
            <div className="text-left">
              <div className="text-[10px] text-white/70">{app.smallText}</div>
              <div className="text-sm font-semibold text-white">{app.mainText}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { AppDownloadSection as AppDownload };

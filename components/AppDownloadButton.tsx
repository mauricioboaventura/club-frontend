import React from "react";

export type AppDownloadButtonProps = {
  smallText: string;
  mainText: string;
  icon: React.ReactNode;
  href: string;
};

export function AppDownloadButton({
  smallText,
  mainText,
  icon,
  href,
}: AppDownloadButtonProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-2.5 px-4 py-2 bg-[#ffffff1a] rounded-[0.75rem] hover:bg-[#4a0e0e] transition-colors"
    >
      <span className="[&_svg]:w-7 [&_svg]:h-7 shrink-0 text-white">
        {icon}
      </span>
      <div className="text-left">
        <span className="text-[10px] text-white/90 block">{smallText}</span>
        <span className="text-[15px] font-bold text-white">{mainText}</span>
      </div>
    </a>
  );
}

export const appStoreIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export const googlePlayIcon = (
  <svg viewBox="0 0 24 24" className="fill-current">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"></path>
  </svg>
);

function AppDownloadSection() {
  return (
    <section className="bg-[#2a0606] px-4 pt-8 pb-6 max-w-[480px] mx-auto text-left">
      <h3 className="text-[17px] font-bold text-white mb-5">
        Baixe o app Monte Carlo
      </h3>
      <div className="flex gap-3">
        <AppDownloadButton
          smallText="Download on the"
          mainText="App Store"
          icon={appStoreIcon}
          href="#"
        />
        <AppDownloadButton
          smallText="GET IT ON"
          mainText="Google Play"
          icon={googlePlayIcon}
          href="#"
        />
      </div>
    </section>
  );
}

export default AppDownloadSection;
export { AppDownloadSection as AppDownload };

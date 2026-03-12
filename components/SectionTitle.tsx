type SectionTitleProps = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-xs uppercase font-medium tracking-[0.3em] text-[#8b1a1a]">
        {children}
      </h2>
    </div>
  );
}

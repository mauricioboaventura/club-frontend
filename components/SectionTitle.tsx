type SectionTitleProps = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-[15px] uppercase font-extrabold tracking-[0.5px] text-[#8c8c8c]">
        {children}
      </h2>
    </div>
  );
}

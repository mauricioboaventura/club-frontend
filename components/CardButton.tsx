type CardButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export default function CardButton({ children, icon }: CardButtonProps) {
  return (
    <div className="flex justify-center mt-4 flex-shrink-0">
      <span className="inline-flex items-center justify-center gap-2 w-full py-1 px-6 rounded-[10px] border border-[#1a1a1a]/30 text-[#1a1a1a] text-[13px] font-medium">
        {icon}
        {children}
      </span>
    </div>
  );
}

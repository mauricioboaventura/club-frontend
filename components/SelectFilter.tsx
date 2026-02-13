"use client";

import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

type SelectFilterProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SelectFilter({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
}: SelectFilterProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[#6b6660]">{label}:</span>
      <Select.Root value={value || undefined} onValueChange={onChange}>
        <Select.Trigger
          className="flex items-center justify-between rounded-md border border-[#e5e0d5] bg-white px-3 py-2 h-9 w-full text-xs text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#430904]/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-[#1a1a1a]"
          aria-label={label}
        >
          <Select.Value placeholder={placeholder} className="line-clamp-1" />
          <Select.Icon asChild>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" strokeWidth={2} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="relative z-50 max-h-96 min-w-[var(--radix-select-trigger-width)] w-max overflow-hidden rounded-md border border-[#e5e0d5] bg-white p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt}
                value={opt}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-[#1a1a1a] outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-[#f5f0e8] data-[state=checked]:bg-[#430904] data-[state=checked]:text-white data-[state=checked]:data-[highlighted]:bg-[#430904] data-[state=checked]:data-[highlighted]:text-white"
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <Select.ItemIndicator>
                    <Check className="h-4 w-4" strokeWidth={2} />
                  </Select.ItemIndicator>
                </span>
                <Select.ItemText className="whitespace-nowrap">{opt}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  );
}

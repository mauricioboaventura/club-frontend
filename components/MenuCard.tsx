import { CalendarDays } from "lucide-react";
import { formatMenuDate, type DailyMenu } from "@/lib/api/restaurants";

export default function MenuCard({ menu }: { menu: DailyMenu }) {
  const sections = [
    { label: "Proteínas", value: menu.proteins },
    { label: "Acompanhamentos", value: menu.garnishes },
    { label: "Massas", value: menu.pastas },
    { label: "Saladas", value: menu.salads },
  ].filter((s) => s.value);

  return (
    <div className="rounded-2xl bg-white shadow-md border border-[#e5e0d5] overflow-hidden">
      {/* Cabeçalho do cardápio */}
      <div
        className="relative px-5 py-4 text-white"
        style={{ backgroundColor: "#430904" }}
      >
        <div className="flex items-center gap-2 text-white/70 text-xs mb-1">
          <CalendarDays className="h-3.5 w-3.5" />
          <span className="capitalize">{formatMenuDate(menu.menuDate)}</span>
        </div>
        {(menu.title || menu.theme) && (
          <h3 className="text-lg font-bold">{menu.title || menu.theme}</h3>
        )}
      </div>

      {/* Itens do cardápio */}
      <div className="p-5 space-y-4">
        {sections.map((section) => (
          <div key={section.label}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8b1a1a] mb-1">
              {section.label}
            </h4>
            <p className="text-sm text-[#4f4a44] leading-relaxed">
              {section.value}
            </p>
          </div>
        ))}

        {menu.description && sections.length === 0 && (
          <p className="text-sm text-[#4f4a44] leading-relaxed">
            {menu.description}
          </p>
        )}

        {sections.length === 0 && !menu.description && (
          <p className="text-sm text-[#8c8c8c] italic">
            Cardápio ainda não detalhado.
          </p>
        )}
      </div>
    </div>
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, CalendarDays, Utensils } from "lucide-react";
import {
  fetchRestaurantById,
  fetchMenusByRestaurant,
  formatMenuDate,
  type DailyMenu,
} from "@/lib/api/restaurants";

type RestaurantDetailPageProps = {
  params: { id: string };
};

function MenuCard({ menu }: { menu: DailyMenu }) {
  const sections = [
    { label: "Proteínas", value: menu.proteins },
    { label: "Acompanhamentos", value: menu.garnishes },
    { label: "Massas", value: menu.pastas },
    { label: "Saladas", value: menu.salads },
  ].filter((s) => s.value);

  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
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

export default async function RestaurantDetailPage({
  params,
}: RestaurantDetailPageProps) {
  const [restaurant, menus] = await Promise.all([
    fetchRestaurantById(params.id),
    fetchMenusByRestaurant(params.id),
  ]);

  if (!restaurant) {
    notFound();
  }

  const imageUrl =
    restaurant.imageUrl ??
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop";

  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[320px] w-full">
        <Image
          src={imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          {restaurant.description && (
            <p className="mt-2 max-w-3xl text-sm text-white/90">
              {restaurant.description}
            </p>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="mx-auto max-w-4xl px-4 py-6">
        {restaurant.address && (
          <div className="flex items-center gap-2 rounded-2xl bg-white p-4 shadow-sm text-sm text-[#5f5a54]">
            <MapPin className="h-4 w-4 text-[#8b1a1a] shrink-0" />
            <span>{restaurant.address}</span>
          </div>
        )}
      </section>

      {/* Cardápios */}
      <section className="mx-auto max-w-4xl px-4 pb-24 lg:pb-16">
        <div className="flex items-center gap-2 mb-4">
          <Utensils className="h-5 w-5 text-[#8b1a1a]" />
          <h2 className="text-lg font-semibold text-[#1a1a1a]">Cardápios</h2>
        </div>

        {menus.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-[#6b6660]">
            Nenhum cardápio disponível no momento.
          </div>
        ) : (
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

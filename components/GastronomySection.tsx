import Link from "next/link";
import Image from "next/image";
import { Utensils, ChevronRight } from "lucide-react";
import type { Restaurant } from "@/lib/api/restaurants";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop";

interface GastronomySectionProps {
  restaurants: Restaurant[];
}

export default function GastronomySection({ restaurants }: GastronomySectionProps) {
  return (
    <section className="py-6 max-w-[480px] mx-auto lg:max-w-7xl lg:px-6 bg-[#fcfaf6]">
      <div className="flex items-center justify-between px-4 mb-4">
        <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-[#8b1a1a]">
          Gastronomia
        </h2>
        <Link
          href="/gastronomia"
          className="text-sm text-[#8b1a1a] underline underline-offset-2 hover:text-[#6b1515] transition-colors"
        >
          Ver tudo
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto scroll-hidden px-4 pb-2 lg:grid lg:grid-cols-3 lg:gap-4">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            href={`/gastronomia/${restaurant.id}`}
            className="relative flex-shrink-0 w-72 lg:w-auto rounded-xl overflow-hidden bg-white border border-[#8b1a1a]/10 hover:border-[#8b1a1a]/20 transition-colors"
          >
            <div className="relative h-40">
              <Image
                src={restaurant.imageUrl ?? FALLBACK_IMAGE}
                alt={restaurant.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 288px, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">
                {restaurant.name}
              </h3>
              {/* <p className="text-xs text-[#6b6660] mb-3 line-clamp-2">
                {restaurant.description}
              </p> */}
              <span className="inline-flex items-center justify-center rounded-md px-3 w-full h-8 text-xs font-medium border border-[#8b1a1a]/30 text-[#8b1a1a] hover:bg-[#8b1a1a]/10 transition-colors">
                Cardápio
              </span>
            </div>
          </Link>
        ))}

        {/* Card âncora para Nossos Pratos */}
        <Link
          href="/gastronomia#nossos-pratos"
          className="relative flex-shrink-0 w-72 lg:w-auto rounded-xl overflow-hidden bg-white border border-[#8b1a1a]/10 hover:border-[#8b1a1a]/20 transition-colors"
        >
          <div className="relative h-40 w-full">
            <Image
              src="https://ppvlzlzceuwxnishsotz.supabase.co/storage/v1/object/public/site/images/banners-site-Gastronomia-WEB.png"
              alt="Nossos Pratos"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 288px, 33vw"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">
              Nossos Pratos
            </h3>
            {/* <p className="text-xs text-[#6b6660] mb-3 line-clamp-2">
              Criações autorais dos nossos chefs
            </p> */}
            <span className="inline-flex items-center justify-center rounded-md px-3 w-full h-8 text-xs font-medium border border-[#8b1a1a]/30 text-[#8b1a1a] hover:bg-[#8b1a1a]/10 transition-colors gap-1">
              Ver pratos
              {/* <ChevronRight className="h-3.5 w-3.5" /> */}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

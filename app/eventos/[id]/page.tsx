import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { fetchEventById } from "@/lib/api/pages";

type EventDetailPageProps = {
  params: { id: string };
};

function formatDate(date: string | null): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date: string | null): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await fetchEventById(params.id);

  if (!event) {
    notFound();
  }

  const imageUrl =
    event.heroImageUrl ??
    event.coverImageUrl ??
    event.event_images?.[0]?.imageUrl ??
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop";

  const mobileImageUrl = event.mobileImageUrl ?? null;

  return (
    <main className="min-h-screen bg-[#f9f8f0]">
      <section className="relative h-[50vh] min-h-[320px] w-full">
        {mobileImageUrl && (
          <Image
            src={mobileImageUrl}
            alt={event.title}
            fill
            className="object-cover lg:hidden"
            priority
          />
        )}
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          className={`object-cover ${mobileImageUrl ? "hidden lg:block" : ""}`}
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" /> */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-20 lg:pt-[4.5rem]">
          <Link
            href="/eventos"
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Eventos
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          {event.shortDescription && (
            <p className="mt-2 max-w-3xl text-sm text-white/90">{event.shortDescription}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2">
          <div className="flex items-center gap-2 text-sm text-[#5f5a54]">
            <Calendar className="h-4 w-4 text-[#8b1a1a]" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#5f5a54]">
            <Clock className="h-4 w-4 text-[#8b1a1a]" />
            <span>
              {formatTime(event.startDate)}
              {event.endDate ? ` - ${formatTime(event.endDate)}` : ""}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-[#5f5a54]">
              <MapPin className="h-4 w-4 text-[#8b1a1a]" />
              <span>{event.location}</span>
            </div>
          )}
          {event.priceInfo && (
            <div className="flex items-center gap-2 text-sm text-[#5f5a54]">
              <Ticket className="h-4 w-4 text-[#8b1a1a]" />
              <span>{event.priceInfo}</span>
            </div>
          )}
        </div>

        <article className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-[#1a1a1a]">Detalhes do evento</h2>
          <p className="text-sm leading-relaxed text-[#4f4a44]">
            {event.description || "Sem descrição disponível para este evento."}
          </p>
          {event.tags && event.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#8b1a1a]/20 px-3 py-1 text-xs text-[#8b1a1a]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, List, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";

interface Tournament {
  id: number;
  name: string;
  date: string;
  time: string;
  buyIn: string;
  guaranteed: string;
  highlight: boolean;
}
const tournaments = [
  {
    id: 1,
    name: "Daily Deepstack",
    date: "2025-02-01",
    time: "19:00",
    buyIn: "R$ 150 + 30",
    guaranteed: "R$ 5.000",
    highlight: false,
  },
  {
    id: 2,
    name: "Super Satélite Mensal",
    date: "2025-02-02",
    time: "15:00",
    buyIn: "R$ 100 + 20",
    guaranteed: "5 vagas",
    highlight: true,
  },
  {
    id: 3,
    name: "Bounty Hunter",
    date: "2025-02-02",
    time: "21:00",
    buyIn: "R$ 200 + 40",
    guaranteed: "R$ 10.000",
    highlight: false,
  },
  {
    id: 4,
    name: "Torneio Semanal",
    date: "2025-02-05",
    time: "20:00",
    buyIn: "R$ 300 + 50",
    guaranteed: "R$ 15.000",
    highlight: false,
  },
  {
    id: 5,
    name: "Main Event Mensal",
    date: "2025-02-15",
    time: "14:00",
    buyIn: "R$ 500 + 80",
    guaranteed: "R$ 50.000",
    highlight: true,
  },
  {
    id: 6,
    name: "High Roller",
    date: "2025-02-20",
    time: "20:00",
    buyIn: "R$ 1.000 + 150",
    guaranteed: "R$ 30.000",
    highlight: true,
  },
];

const Torneios = () => {
  const router = useRouter();
  const { openAuth } = useAuth();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tournamentDates = tournaments.map((t) => new Date(t.date));

  const filteredTournaments = selectedDate
    ? tournaments.filter(
        (t) => new Date(t.date).toDateString() === selectedDate.toDateString()
      )
    : tournaments;

  const handleTournamentClick = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setIsModalOpen(true);
  };

  const handleRegistration = () => {
    setIsModalOpen(false);
    setTimeout(() => openAuth(), 300);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Header */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&auto=format&fit=crop"
          alt="Torneios"
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 safe-top"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white">Torneios</h1>
          <p className="text-white/80 text-sm mt-1">Agenda completa de competições</p>
        </div>
      </div>

      <main className="p-4 space-y-4 lg:max-w-5xl lg:mx-auto">
        {/* View Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex-1 rounded-lg"
          >
            <List className="h-4 w-4 mr-2" />
            Lista
          </Button>
          <Button
            variant={viewMode === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="flex-1 rounded-lg"
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendário
          </Button>
        </div>

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <Card className="p-2 rounded-xl border-0 shadow-sm">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{
                hasTournament: tournamentDates,
              }}
              modifiersStyles={{
                hasTournament: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "white",
                  borderRadius: "50%",
                },
              }}
              className="w-full"
            />
          </Card>
        )}

        {/* Tournament List */}
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          {(viewMode === "calendar" ? filteredTournaments : tournaments).map((tournament) => (
            <Card
              key={tournament.id}
              onClick={() => handleTournamentClick(tournament)}
              className="p-4 rounded-xl border border-[#5C0F08] shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{tournament.name}</h3>
                    {tournament.highlight && (
                      <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(tournament.date).toLocaleDateString("pt-BR", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    })} • {tournament.time}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Buy-in</p>
                  <p className="font-medium text-foreground">{tournament.buyIn}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Garantido</p>
                  <p className="font-medium text-primary">{tournament.guaranteed}</p>
                </div>
              </div>
            </Card>
          ))}

          {viewMode === "calendar" && filteredTournaments.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Nenhum torneio nesta data
            </p>
          )}
        </div>
      </main>

      {/* Tournament Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] max-h-[85vh] rounded-2xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {selectedTournament?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedTournament && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Data</span>
                  <span className="font-medium text-foreground">
                    {new Date(selectedTournament.date).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Horário</span>
                  <span className="font-medium text-foreground">{selectedTournament.time}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-muted-foreground">Buy-in</span>
                  <span className="font-medium text-foreground">{selectedTournament.buyIn}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Garantido</span>
                  <span className="font-medium text-primary">{selectedTournament.guaranteed}</span>
                </div>
              </div>
              
              <Button
                onClick={handleRegistration}
                className="w-full h-12 rounded-full bg-[#2A0303] hover:bg-[#420804] text-white font-semibold text-base"
              >
                Realizar inscrição!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Torneios;

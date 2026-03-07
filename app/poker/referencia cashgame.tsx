import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const tables = {
  omaha: [
    { id: 1, name: "OMAHA 5/5", min: "R$ 300,00", max: "R$ 2.000,00" },
    { id: 2, name: "OMAHA 5/10", min: "R$ 500,00", max: "R$ 5.000,00" },
    { id: 3, name: "OMAHA 10/25", min: "R$ 1.000,00", max: "R$ 15.000,00" },
    { id: 4, name: "OMAHA 25/50", min: "R$ 2.000,00", max: "R$ 30.000,00" },
  ],
  texas: [
    { id: 5, name: "TEXAS HOLD'EM 5/5", min: "R$ 300,00", max: "R$ 1.000,00" },
    { id: 6, name: "TEXAS HOLD'EM 5/10", min: "R$ 500,00", max: "R$ 3.000,00" },
    { id: 7, name: "TEXAS HOLD'EM 10/20", min: "R$ 1.000,00", max: "R$ 10.000,00" },
    { id: 8, name: "TEXAS HOLD'EM 25/50", min: "R$ 2.000,00", max: "R$ 20.000,00" },
    { id: 9, name: "TEXAS HOLD'EM 50/100", min: "R$ 5.000,00", max: "R$ 50.000,00" },
  ],
};

const CashGame = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1609743522653-52354461eb27?w=800&auto=format&fit=crop"
          alt="Cash Game"
          className="w-full h-64 object-cover"
        />
        
        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 safe-top"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <main className="px-4 py-8 lg:max-w-5xl lg:mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">Cash Game</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            O jogo não para! Mesas de Texas e Omaha todos os dias
          </p>
        </div>

        {/* Info Section */}
        <div className="text-center mb-10 space-y-1">
          <p className="text-foreground">
            <span className="font-bold">PROGRAMAÇÃO:</span> 24 horas por dia
          </p>
          <p className="text-foreground">
            <span className="font-bold">MODALIDADES:</span> Texas Hold'em e Omaha
          </p>
        </div>

        {/* Omaha Tables */}
        <div className="mb-10">
          <h2 className="text-center font-bold text-foreground mb-6">MESAS OMAHA:</h2>
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {tables.omaha.map((table) => (
              <div key={table.id}>
                <h3 className="font-medium text-foreground mb-2">{table.name}</h3>
                <p className="text-foreground">
                  <span className="font-bold">Mínimo:</span> {table.min}
                </p>
                <p className="text-foreground">
                  <span className="font-bold">Máximo:</span> {table.max}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Texas Hold'em Tables */}
        <div className="mb-10">
          <h2 className="text-center font-bold text-foreground mb-6">MESAS TEXAS:</h2>
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
            {tables.texas.map((table) => (
              <div key={table.id}>
                <h3 className="font-medium text-foreground mb-2">{table.name}</h3>
                <p className="text-foreground">
                  <span className="font-bold">Mínimo:</span> {table.min}
                </p>
                <p className="text-foreground">
                  <span className="font-bold">Máximo:</span> {table.max}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default CashGame;

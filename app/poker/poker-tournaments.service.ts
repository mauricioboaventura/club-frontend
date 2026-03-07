export interface PokerTournament {
  id: number;
  name: string;
  date: string;
  time: string;
  buyIn: string;
  guaranteed: string;
  highlight: boolean;
}

export const pokerTournaments: PokerTournament[] = [
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

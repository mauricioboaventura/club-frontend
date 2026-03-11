/**
 * Utilitários de data para a agenda semanal de torneios de poker.
 * Funções puras — podem rodar no server e no client.
 * Semana começa na segunda-feira (padrão brasileiro).
 */

/** Formata Date para string YYYY-MM-DD */
export function formatDateISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Retorna início (segunda 00:00) e fim (domingo 23:59:59) da semana que contém a data */
export function getWeekRange(date: Date): { start: Date; end: Date } {
  const d = new Date(date);
  const day = d.getDay(); // 0=dom, 1=seg, ..., 6=sáb
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const start = new Date(d);
  start.setDate(d.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export type WeekOption = {
  value: string; // "YYYY-MM-DD_YYYY-MM-DD"
  label: string; // "09/03 a 15/03"
  start: string; // "YYYY-MM-DD"
  end: string; // "YYYY-MM-DD"
};

/** Retorna todas as semanas (seg–dom) que possuem dias dentro de um mês */
export function getWeeksOfMonth(year: number, month: number): WeekOption[] {
  const weeks: WeekOption[] = [];
  const seen = new Set<string>();

  // Itera cada dia do mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const { start, end } = getWeekRange(date);
    const startISO = formatDateISO(start);
    const endISO = formatDateISO(end);
    const key = `${startISO}_${endISO}`;

    if (!seen.has(key)) {
      seen.add(key);
      const label = `${String(start.getDate()).padStart(2, "0")}-${String(start.getMonth() + 1).padStart(2, "0")} a ${String(end.getDate()).padStart(2, "0")}-${String(end.getMonth() + 1).padStart(2, "0")}`;
      weeks.push({ value: key, label, start: startISO, end: endISO });
    }
  }

  return weeks;
}

export type MonthOption = {
  value: string; // "YYYY-MM"
  label: string; // "Março 2026"
  year: number;
  month: number; // 0-indexed
};

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

/** Gera lista de meses (mês atual + próximos N) */
export function getMonthOptions(count = 4): MonthOption[] {
  const now = new Date();
  const options: MonthOption[] = [];

  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const year = d.getFullYear();
    const month = d.getMonth();
    options.push({
      value: `${year}-${String(month + 1).padStart(2, "0")}`,
      label: MONTH_NAMES[month],
      year,
      month,
    });
  }

  return options;
}

export type DayOption = {
  date: string; // "YYYY-MM-DD"
  dayName: string; // "Seg", "Ter", ...
  dayNumber: number; // 10, 11, ...
  isToday: boolean;
};

const DAY_NAMES_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

/** Retorna os 7 dias da semana a partir de uma segunda-feira */
export function getDaysOfWeek(weekStartISO: string): DayOption[] {
  const today = formatDateISO(new Date());
  const [y, m, d] = weekStartISO.split("-").map(Number);
  const start = new Date(y, m - 1, d);
  const days: DayOption[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    const iso = formatDateISO(date);
    days.push({
      date: iso,
      dayName: DAY_NAMES_SHORT[date.getDay()],
      dayNumber: date.getDate(),
      isToday: iso === today,
    });
  }

  return days;
}

/** Verifica se duas datas ISO (YYYY-MM-DD) representam o mesmo dia */
export function isSameDay(a: string, b: string): boolean {
  return a === b;
}

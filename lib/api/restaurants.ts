const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.rdc-dev.com.br/api";

export type Restaurant = {
  id: string;
  name: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DailyMenu = {
  id: string;
  restaurantId: string;
  menuDate: string;
  theme?: string;
  title?: string;
  proteins?: string;
  garnishes?: string;
  pastas?: string;
  salads?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  restaurants?: Restaurant;
};

export async function fetchActiveRestaurants(): Promise<Restaurant[]> {
  try {
    const res = await fetch(`${API_BASE}/restaurants/active`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Restaurants API error: ${res.status}`);
    }

    const json: Restaurant[] = await res.json();
    return json.filter((r) => r.isActive === true);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchActiveRestaurants]", err);
    }
    return [];
  }
}

export async function fetchRestaurantById(
  id: string,
): Promise<Restaurant | null> {
  try {
    const res = await fetch(`${API_BASE}/restaurants/${id}`, {
      next: { revalidate: 60 },
    });

    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`Restaurant API error: ${res.status}`);
    }

    const json: Restaurant = await res.json();
    return json?.id ? json : null;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchRestaurantById]", err);
    }
    return null;
  }
}

export async function fetchMenusByRestaurant(
  restaurantId: string,
): Promise<DailyMenu[]> {
  try {
    console.log(`${API_BASE}/daily-menus?restaurantId=${encodeURIComponent(restaurantId)}`);
    const res = await fetch(
      `${API_BASE}/daily-menus?restaurantId=${encodeURIComponent(restaurantId)}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      throw new Error(`Daily Menus API error: ${res.status}`);
    }

    const json = await res.json();
    const data: DailyMenu[] = Array.isArray(json) ? json : (json.data ?? []);
    return data.filter((m) => m.isActive === true);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchMenusByRestaurant]", err);
    }
    return [];
  }
}

export async function fetchUpcomingMenus(limit = 7): Promise<DailyMenu[]> {
  try {
    const res = await fetch(
      `${API_BASE}/daily-menus/upcoming?limit=${limit}`,
      { next: { revalidate: 60 } },
    );

    if (!res.ok) {
      throw new Error(`Upcoming Menus API error: ${res.status}`);
    }

    const json: DailyMenu[] = await res.json();
    return json;
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[fetchUpcomingMenus]", err);
    }
    return [];
  }
}

export function formatMenuDate(dateStr: string): string {
  const date = new Date(dateStr + "T12:00:00");
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

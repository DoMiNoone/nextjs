import { cacheLife } from "next/cache";

export const cities = {
  bangkok: { name: "กรุงเทพฯ", lat: 13.75, lon: 100.5 },
  chiangmai: { name: "เชียงใหม่", lat: 18.79, lon: 98.98 },
  phuket: { name: "ภูเก็ต", lat: 7.88, lon: 98.39 },
};

export type CityId = keyof typeof cities;

export type Weather = {
  city: string;
  temperature: number;
  wind: number;
  updatedAt: string;
};

export function isCity(id: string): id is CityId {
  return Object.hasOwn(cities, id);
}

export async function getWeather(id: CityId): Promise<Weather> {
  "use cache";
  cacheLife("minutes"); // จำผลไว้ ~1 นาที ไม่ยิง API ซ้ำทุกครั้ง

  const baseUrl =
    process.env.WEATHER_API_URL || "https://api.open-meteo.com/v1/forecast";
  const { name, lat, lon } = cities[id];
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "temperature_2m,wind_speed_10m",
  });

  const res = await fetch(`${baseUrl}?${params}`, {
    signal: AbortSignal.timeout(5000), // รอไม่เกิน 5 วินาที
  });
  if (!res.ok) throw new Error(`Weather API ตอบ ${res.status}`);

  const data = await res.json();
  return {
    city: name,
    temperature: data.current.temperature_2m,
    wind: data.current.wind_speed_10m,
    updatedAt: data.current.time,
  };
}
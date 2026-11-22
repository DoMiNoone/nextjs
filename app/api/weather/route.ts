import type { NextRequest } from "next/server";
import { getWeather, isCity } from "@/lib/weather";

// GET /api/weather?city=bangkok
export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city") ?? "bangkok";
  if (!isCity(city)) {
    return Response.json({ error: "ไม่รู้จักเมืองนี้" }, { status: 400 });
  }

  try {
    const weather = await getWeather(city);
    return Response.json(weather);
  } catch (err) {
    console.error(err); // รายละเอียด error ดูใน terminal เท่านั้น
    return Response.json(
      { error: "ดึงข้อมูลอากาศไม่สำเร็จ" },
      { status: 502 }
    );
  }
}

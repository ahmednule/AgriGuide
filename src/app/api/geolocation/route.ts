import { NextResponse } from "next/server";
import { GEOLOCATION_API } from "@/lib/constants";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      throw new Error("Latitude and longitude are required");
    }

    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API}&lat=${lat}&long=${lon}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${errorText}`);
      return NextResponse.json(
        { message: "Failed to fetch location details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Geolocation API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GEOLOCATION_API;
    if (!apiKey) {
      throw new Error("GEOLOCATION_API key is not set");
    }

    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${errorText}`);
      return NextResponse.json(
        { message: "Failed to fetch location data" },
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
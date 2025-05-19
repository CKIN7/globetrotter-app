import { NextResponse } from 'next/server';

const FLIGHTS_URL =
  'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';

  try {
    const response = await fetch(FLIGHTS_URL);
    const data = await response.json();

    const filteredData = data.filter((flight: any) =>
      flight.destination.toLowerCase().includes(query)
    );

    return NextResponse.json(filteredData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch flight data' },
      { status: 500 }
    );
  }
}

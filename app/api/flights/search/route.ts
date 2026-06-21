import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Fallback URL for local testing if N8N_WEBHOOK_URL is not set
    const webhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/flight-search';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Flight search error:', error);
    // Return mock data if the webhook fails (useful for UI development before n8n is fully online)
    const mockData = [
      {
        airline: 'Delta Air Lines',
        flight_number: 'DL 123',
        departure_time: '2026-07-01T08:00:00Z',
        cash_price: 450,
        points_required: 30000,
      },
      {
        airline: 'United Airlines',
        flight_number: 'UA 456',
        departure_time: '2026-07-01T14:30:00Z',
        cash_price: 320,
        points_required: 21333,
      },
      {
        airline: 'American Airlines',
        flight_number: 'AA 789',
        departure_time: '2026-07-01T18:45:00Z',
        cash_price: 550,
        points_required: 36666,
      }
    ];
    return NextResponse.json(mockData);
  }
}

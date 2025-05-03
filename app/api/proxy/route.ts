import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://women-safety-gold.vercel.app/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from the server');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxy route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 
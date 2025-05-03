import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400, headers }
      );
    }

    // Here you can add your chatbot logic
    // For now, we'll return a simple response
    const response = {
      answer: `I received your question: "${question}". This is a placeholder response. You can implement your actual chatbot logic here.`
    };

    return NextResponse.json(response, { headers });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500, headers }
    );
  }
} 
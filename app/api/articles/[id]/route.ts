import { NextRequest, NextResponse } from 'next/server';

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders });
  }

  try {
    const { id } = params;
    
    // Input validation
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400, headers: corsHeaders }
      );
    }

    // In a real application, you would fetch this from a database
    // For now, we'll return a mock article
    const article = {
      id,
      title: "Women's Safety: Essential Tips and Strategies",
      description: `In today's world, ensuring personal safety is crucial for everyone, especially women. Here are some essential tips and strategies to stay safe:

1. Be Aware of Your Surroundings
Always stay alert and aware of your environment. Avoid distractions like excessive phone use when walking alone.

2. Trust Your Instincts
If something feels wrong, it probably is. Don't hesitate to remove yourself from uncomfortable situations.

3. Emergency Preparedness
Keep emergency numbers handy and consider installing safety apps on your phone.

4. Self-Defense Training
Consider taking self-defense classes to build confidence and learn essential protection skills.

5. Digital Safety
Be cautious about sharing personal information online and maintain strong privacy settings.

Remember, your safety is paramount. These tips are just a starting point - always prioritize your well-being and don't hesitate to seek help when needed.`,
      type: 'blog',
      url: '#',
      date: new Date().toISOString().split('T')[0],
      source: 'AI Generated'
    };

    return NextResponse.json(article, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch article', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500, headers: corsHeaders }
    );
  }
} 
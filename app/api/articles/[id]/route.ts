import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers: corsHeaders });
  }

  try {
    const id = params.id;
    
    // Input validation
    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Generate article using GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates informative articles about women's safety and empowerment. Generate detailed, practical content with real-world examples."
        },
        {
          role: "user",
          content: "Generate a comprehensive article about women's safety tips and strategies. Include practical advice, real-world scenarios, and actionable steps. Make it engaging and informative."
        }
      ],
      max_tokens: 1500,
    });

    const generatedContent = completion.choices[0].message.content;

    const article = {
      id,
      title: "Women's Safety: Essential Tips and Strategies",
      description: generatedContent,
      type: 'blog',
      url: '#',
      date: new Date().toISOString().split('T')[0],
      source: 'AI Generated'
    };

    return NextResponse.json(article, { headers: corsHeaders });
  } catch (error) {
    console.error('Error generating article:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate article', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500, headers: corsHeaders }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';

// Curated list of safety-focused YouTube channels and playlists
const SAFETY_RESOURCES = [
  {
    id: 'video-1',
    title: 'Women\'s Safety Self-Defense Techniques',
    description: 'Learn essential self-defense moves and safety awareness tips for women.',
    videoId: 'MF7reW-hkJE', // Updated with actual video ID
    channel: 'Safety First',
    type: 'video',
    category: 'self-defense'
  },
  {
    id: 'video-2',
    title: 'Child Safety Education',
    description: 'Important safety lessons for children and parents.',
    videoId: 'CqH2QYt6oOc', // Replace with actual video ID
    channel: 'Child Safety Network',
    type: 'video',
    category: 'child-safety'
  },
  {
    id: 'video-3',
    title: 'Digital Safety for Women',
    description: 'Learn how to stay safe online and protect your digital privacy.',
    videoId: 'OZaLTqKt4kw', // Replace with actual video ID
    channel: 'Digital Safety Academy',
    type: 'video',
    category: 'digital-safety'
  },
  {
    id: 'video-4',
    title: 'Emergency Preparedness Guide',
    description: 'Essential tips for handling emergency situations.',
    videoId: 'tXVgUVgHr8E', // Replace with actual video ID
    channel: 'Emergency Response Training',
    type: 'video',
    category: 'emergency'
  },
  {
    id: 'video-5',
    title: 'Mental Health & Wellbeing',
    description: 'Strategies for maintaining mental health and emotional wellbeing.',
    videoId: '2Vtz43pRPas', // Replace with actual video ID
    channel: 'Wellness Channel',
    type: 'video',
    category: 'mental-health'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    // Search through video resources only
    const searchResults = SAFETY_RESOURCES.filter(resource => 
      resource.title.toLowerCase().includes(query.toLowerCase()) ||
      resource.description.toLowerCase().includes(query.toLowerCase()) ||
      resource.category.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json({
      resources: searchResults
    });
  } catch (error) {
    console.error('Error in resource search:', error);
    return NextResponse.json(
      { error: 'Failed to search resources' },
      { status: 500 }
    );
  }
} 
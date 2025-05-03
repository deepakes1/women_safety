import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !(session.user as User).id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { latitude, longitude, timestamp } = await request.json();

    // Mock database storage operation
    console.log('Storing location data:', {
      latitude,
      longitude,
      timestamp,
      userId: (session.user as User).id
    });

    return NextResponse.json({ 
      success: true,
      message: 'Location updated successfully',
      data: {
        latitude,
        longitude,
        timestamp
      }
    });
  } catch (error) {
    console.error('Error updating location:', error);
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    );
  }
} 
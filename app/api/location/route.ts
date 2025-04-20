import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { latitude, longitude, timestamp } = await request.json();

    // Mock database storage operation
    console.log('Storing location data:', {
      latitude,
      longitude,
      timestamp,
      userId: session.user.id
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
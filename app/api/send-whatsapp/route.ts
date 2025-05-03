import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error('Missing required Twilio environment variables');
}

const client = twilio(accountSid, authToken);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const phoneNumber = formData.get('phoneNumber') as string;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Missing phone number' },
        { status: 400 }
      );
    }

    if (!twilioPhoneNumber) {
      return NextResponse.json(
        { error: 'Twilio phone number not configured' },
        { status: 500 }
      );
    }

    // Format phone numbers properly
    const formattedFromNumber = twilioPhoneNumber.startsWith('whatsapp:') 
      ? twilioPhoneNumber 
      : `whatsapp:${twilioPhoneNumber.replace(/\D/g, '')}`;
    
    const formattedToNumber = phoneNumber.startsWith('whatsapp:') 
      ? phoneNumber 
      : `whatsapp:${phoneNumber.replace(/\D/g, '')}`;

    // First, send a text message to initiate the conversation
    await client.messages.create({
      from: formattedFromNumber,
      to: formattedToNumber,
      body: 'You have received an audio message. Please wait while we process it...'
    });

    // Then send the audio message with the audio file URL
    const message = await client.messages.create({
      from: formattedFromNumber,
      to: formattedToNumber,
      body: 'Audio message:',
      mediaUrl: [`${appUrl}/api/audio-file`]
    });

    return NextResponse.json({ 
      success: true, 
      messageSid: message.sid,
      from: formattedFromNumber,
      to: formattedToNumber
    });
  } catch (error: unknown) {
    console.error('Error sending WhatsApp message:', error);
    
    // Handle specific Twilio errors
    if (error instanceof Error && 'code' in error && error.code === 63007) {
      return NextResponse.json(
        { 
          error: 'WhatsApp number not properly configured. Please check your Twilio settings.',
          details: error.message
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
} 
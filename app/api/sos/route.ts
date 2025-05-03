import { NextResponse } from 'next/server';

import twilio from 'twilio';

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST() {
  try {
    // You should store these in a database and fetch them
    const emergencyContacts = [
      { name: 'Emergency Contact 1', phone: '+919944505576' },
    ];

    const message = "EMERGENCY SOS: I need immediate assistance. This is an emergency alert.";

    // Send SMS to all emergency contacts
    const promises = emergencyContacts.map(contact => 
      client.messages.create({
        body: message,
        to: contact.phone,
        from: process.env.TWILIO_PHONE_NUMBER, 
      })
    );

    await Promise.all(promises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending SOS messages:', error);
    return NextResponse.json(
      { error: 'Failed to send SOS messages' },
      { status: 500 }
    );
  }
}
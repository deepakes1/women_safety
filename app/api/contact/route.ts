import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Initialize the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_gilQf6jnyr5V@ep-red-fire-a5hwlaef-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
});

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Insert the data into the database
    const result = await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );

    return NextResponse.json(
      { success: true, data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error storing contact message:', error);
    return NextResponse.json(
      { error: 'Failed to store contact message' },
      { status: 500 }
    );
  }
}

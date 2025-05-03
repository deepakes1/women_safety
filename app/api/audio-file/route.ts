import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { existsSync } from 'fs';

// Store the latest audio file ID
let currentAudioId: string | null = null;

export async function GET() {
  try {
    if (!currentAudioId) {
      return NextResponse.json(
        { error: 'No audio file available' },
        { status: 404 }
      );
    }

    const audioPath = join(process.cwd(), 'public', 'temp', `${currentAudioId}.wav`);
    const audioBuffer = await readFile(audioPath);

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Disposition': 'attachment; filename="audio-message.wav"',
      },
    });
  } catch (error) {
    console.error('Error serving audio file:', error);
    return NextResponse.json(
      { error: 'Failed to serve audio file' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as Blob;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Generate a unique ID for this audio file
    const audioId = uuidv4();
    currentAudioId = audioId;

    // Convert Blob to Buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());

    // Ensure temp directory exists
    const tempDir = join(process.cwd(), 'public', 'temp');
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true });
    }

    // Save the audio file with unique ID
    const audioPath = join(tempDir, `${audioId}.wav`);
    await writeFile(audioPath, buffer);

    return NextResponse.json({ success: true, audioId });
  } catch (error) {
    console.error('Error saving audio file:', error);
    return NextResponse.json(
      { error: 'Failed to save audio file' },
      { status: 500 }
    );
  }
} 
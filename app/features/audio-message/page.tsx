'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, StopCircle, MessageCircle } from 'lucide-react';

export default function AudioMessagePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSending, setIsSending] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const sendAudioMessage = async () => {
    if (audioBlob && phoneNumber) {
      try {
        setIsSending(true);
        
        // First, upload the audio file
        const audioFormData = new FormData();
        audioFormData.append('audio', audioBlob, 'audio-message.wav');
        
        const uploadResponse = await fetch('/api/audio-file', {
          method: 'POST',
          body: audioFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload audio file');
        }

        const uploadResult = await uploadResponse.json();
        if (!uploadResult.success) {
          throw new Error('Failed to process audio file');
        }

        // Then send the WhatsApp message
        const messageFormData = new FormData();
        messageFormData.append('phoneNumber', phoneNumber.replace(/\D/g, ''));

        const response = await fetch('/api/send-whatsapp', {
          method: 'POST',
          body: messageFormData,
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        // Reset after successful send
        setAudioBlob(null);
        setAudioUrl(null);
        setPhoneNumber('');
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSending(false);
      }
    } else {
      alert('Please enter a phone number and record a message first');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Audio Message</h1>
        
        <div className="flex flex-col items-center gap-4">
          {!isRecording && !audioUrl && (
            <Button
              onClick={startRecording}
              className="w-full flex items-center justify-center gap-2"
            >
              <Mic className="w-5 h-5" />
              Start Recording
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600"
            >
              <StopCircle className="w-5 h-5" />
              Stop Recording
            </Button>
          )}

          {audioUrl && (
            <div className="w-full space-y-4">
              <audio src={audioUrl} controls className="w-full" />
              <input
                type="tel"
                placeholder="Enter WhatsApp number (with country code)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
              <Button
                onClick={sendAudioMessage}
                disabled={isSending}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
              >
                <MessageCircle className="w-5 h-5" />
                {isSending ? 'Sending...' : 'Send via WhatsApp'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

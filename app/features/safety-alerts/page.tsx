'use client';

import { useState } from 'react';

export default function SOSPage() {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const sendSOSMessage = async () => {
    try {
      setSending(true);
      const response = await fetch('/api/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to send SOS message');
      }

      setMessage('SOS message sent successfully to your emergency contacts');
    } catch (error) {
      setMessage('Failed to send SOS message. Please try again.');
      console.error('Error sending SOS:', error);
    } finally {
      setSending(false);
    }
  };

  return (
  <div className="relative min-h-screen flex items-center justify-center bg-blue-500/50 px-4 overflow-hidden">
 
      <div className="backdrop-blur-xl bg-white/30 rounded-3xl shadow-xl p-10 max-w-md w-full border border-white/50">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-red-700 drop-shadow-md">🚨 SOS Alert</h1>
          <p className="text-gray-700 mt-2">Tap the button to notify your emergency contacts.</p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={sendSOSMessage}
            disabled={sending}
            className={`
              relative flex items-center justify-center
              h-20 w-20 rounded-full shadow-2xl
              ${sending ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:scale-95'}
              text-white transition-all duration-300 ease-in-out
              ${!sending && 'animate-pulse'}
            `}
          >
            {sending ? (
              <svg className="animate-spin w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>

        <p className="text-center mt-6 text-lg font-medium text-red-600">{sending ? 'Sending SOS...' : 'Tap the button if you’re in danger'}</p>

        {message && (
          <div className={`
            mt-6 rounded-xl p-4 text-sm transition-all duration-300
            ${message.includes('success')
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'}
          `}>
            <div className="flex items-center gap-2">
              <svg
                className={`w-5 h-5 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                {message.includes('success') ? (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
              <span>{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

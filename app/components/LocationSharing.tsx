'use client';

import { useState, useEffect } from 'react';
import { FaShare, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  isVerified: boolean;
}

interface Journey {
  id: string;
  destination: string;
  startTime: number;
  endTime?: number;
  isActive: boolean;
  sharedWith: Contact[];
}

export default function LocationSharing() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [showNewJourneyForm, setShowNewJourneyForm] = useState(false);
  const [newJourney, setNewJourney] = useState({
    destination: '',
    sharedWith: [] as Contact[]
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load contacts from localStorage
    const loadContacts = () => {
      const savedContacts = localStorage.getItem('trustedContacts');
      if (savedContacts) {
        try {
          const parsedContacts = JSON.parse(savedContacts);
          setContacts(parsedContacts);
        } catch (error) {
          console.error('Error parsing contacts:', error);
        }
      }
      setIsLoading(false);
    };

    loadContacts();

    // Set up an interval to check for contact updates
    const interval = setInterval(loadContacts, 1000);

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    return () => clearInterval(interval);
  }, []);

  const startJourney = () => {
    if (newJourney.destination && newJourney.sharedWith.length > 0) {
      const journey: Journey = {
        id: Date.now().toString(),
        destination: newJourney.destination,
        startTime: Date.now(),
        isActive: true,
        sharedWith: newJourney.sharedWith
      };
      setJourneys([...journeys, journey]);
      setNewJourney({ destination: '', sharedWith: [] });
      setShowNewJourneyForm(false);
      
      // Start sharing location with selected contacts
      shareLocationWithContacts(journey);
    }
  };

  const endJourney = (id: string) => {
    setJourneys(journeys.map(journey => 
      journey.id === id ? { ...journey, isActive: false, endTime: Date.now() } : journey
    ));
  };

  const shareLocationWithContacts = async (journey: Journey) => {
    if (!currentLocation) return;

    try {
      // Send location to each contact
      for (const contact of journey.sharedWith) {
        // Here you would implement the actual sharing logic
        // For example, sending an SMS or email with the location
        console.log(`Sharing location with ${contact.name}:`, {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          destination: journey.destination,
          timestamp: new Date().toISOString()
        });

        // You can implement actual sharing methods here:
        // 1. Send SMS using a service like Twilio
        // 2. Send email using a service like SendGrid
        // 3. Store in a database for the contact to view
      }
    } catch (error) {
      console.error('Error sharing location:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Location Sharing</h2>
        <button
          onClick={() => setShowNewJourneyForm(true)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2"
        >
          <FaMapMarkerAlt />
          Start New Journey
        </button>
      </div>

      {showNewJourneyForm && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Start New Journey</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <input
                type="text"
                value={newJourney.destination}
                onChange={(e) => setNewJourney({ ...newJourney, destination: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="Where are you going?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Share With</label>
              {isLoading ? (
                <p className="text-gray-500">Loading contacts...</p>
              ) : contacts.length === 0 ? (
                <p className="text-gray-500">No contacts available. Please add contacts first.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {contacts.map(contact => (
                    <div key={contact.id} className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded">
                      <input
                        type="checkbox"
                        id={`contact-${contact.id}`}
                        checked={newJourney.sharedWith.some(c => c.id === contact.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewJourney({
                              ...newJourney,
                              sharedWith: [...newJourney.sharedWith, contact]
                            });
                          } else {
                            setNewJourney({
                              ...newJourney,
                              sharedWith: newJourney.sharedWith.filter(c => c.id !== contact.id)
                            });
                          }
                        }}
                      />
                      <label htmlFor={`contact-${contact.id}`} className="flex-1">
                        <span className="font-medium">{contact.name}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({contact.phone || contact.email})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={startJourney}
                disabled={!newJourney.destination || newJourney.sharedWith.length === 0}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Journey
              </button>
              <button
                onClick={() => setShowNewJourneyForm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {journeys.map(journey => (
          <div key={journey.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{journey.destination}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Started: {new Date(journey.startTime).toLocaleString()}
                </p>
                {journey.endTime && (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Ended: {new Date(journey.endTime).toLocaleString()}
                  </p>
                )}
                <div className="mt-2">
                  <p className="text-sm font-medium">Shared with:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300">
                    {journey.sharedWith.map(contact => (
                      <li key={contact.id}>{contact.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {journey.isActive ? (
                  <>
                    <button
                      onClick={() => shareLocationWithContacts(journey)}
                      className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-full"
                      title="Share Location"
                    >
                      <FaShare />
                    </button>
                    <button
                      onClick={() => endJourney(journey.id)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full"
                      title="End Journey"
                    >
                      <FaTimesCircle />
                    </button>
                  </>
                ) : (
                  <span className="text-green-500">
                    <FaCheckCircle className="text-xl" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {journeys.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No active journeys. Click &quot;Start New Journey&quot; to begin sharing your location.
          </p>
        )}
      </div>
    </div>
  );
} 
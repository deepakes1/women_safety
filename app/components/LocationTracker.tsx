'use client';

import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaTimes, FaHistory, FaMobileAlt, FaLocationArrow } from 'react-icons/fa';

interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export default function LocationTracker() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [locationHistory, setLocationHistory] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showPermissionPopup, setShowPermissionPopup] = useState(true);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    checkMobile();

    // Automatically start tracking when component mounts
    requestLocationPermission();
  }, []); // Empty dependency array is fine here since we're only running on mount

  const requestLocationPermission = () => {
    setShowPermissionPopup(false);
    setIsTracking(true);
    setIsLoading(true);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocation(position);
        // Set up continuous tracking
        const watchId = navigator.geolocation.watchPosition(
          updateLocation,
          (err) => {
            let errorMessage = 'Failed to track location';
            let showSettingsLink = false;
            
            switch (err.code) {
              case err.TIMEOUT:
                errorMessage = 'Location tracking timed out. Please check your internet connection and GPS settings.';
                showSettingsLink = true;
                break;
              case err.PERMISSION_DENIED:
                errorMessage = 'Location permission denied. Please enable location services in your browser settings.';
                showSettingsLink = true;
                break;
              case err.POSITION_UNAVAILABLE:
                if (isMobile) {
                  errorMessage = 'Location information unavailable. Please ensure location services are enabled in your browser settings.';
                }
                break;
            }
            setError(errorMessage);
            setIsTracking(false);
            setIsLoading(false);

            // Show settings link if needed
            if (showSettingsLink) {
              setShowPermissionPopup(true);
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
          }
        );

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      },
      (err) => {
        let errorMessage = 'Failed to get location';
        let showSettingsLink = false;
        
        switch (err.code) {
          case err.TIMEOUT:
            errorMessage = 'Location request timed out. Please check your internet connection and GPS settings.';
            showSettingsLink = true;
            break;
          case err.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location services in your browser settings.';
            showSettingsLink = true;
            break;
          case err.POSITION_UNAVAILABLE:
            if (isMobile) {
              errorMessage = 'Location information unavailable. Please ensure location services are enabled in your browser settings.';
            }
            break;
        }
        setError(errorMessage);
        setIsTracking(false);
        setIsLoading(false);

        // Show settings link if needed
        if (showSettingsLink) {
          setShowPermissionPopup(true);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      }
    );
  };

  const updateLocation = async (position: GeolocationPosition) => {
    try {
      setIsLoading(true);
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp
      };

      setLocation(newLocation);
      setLastUpdate(new Date());
      setLocationHistory(prev => [...prev, newLocation].slice(-10));
      setError(null);

      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocation),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }
    } catch (err) {
      console.error('Error updating location:', err);
      setError('Failed to update location');
    } finally {
      setIsLoading(false);
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setIsTracking(true);
    setError(null);
    setIsLoading(true);

    // Get initial position with increased timeout
    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateLocation(position);
        // Set up continuous tracking
        const watchId = navigator.geolocation.watchPosition(
          updateLocation,
          (err) => {
            let errorMessage = 'Failed to track location';
            switch (err.code) {
              case err.TIMEOUT:
                errorMessage = 'Location tracking timed out. Please check your internet connection and GPS settings.';
                break;
              case err.PERMISSION_DENIED:
                errorMessage = 'Location permission denied. Please enable location services in your browser settings.';
                break;
              case err.POSITION_UNAVAILABLE:
                if (isMobile) {
                  errorMessage = 'GPS signal not found. Please ensure:\n1. GPS is enabled in your device settings\n2. You are outdoors or near a window\n3. Location services are enabled for this app';
                } else {
                  errorMessage = 'Location information unavailable. Please ensure location services are enabled in your browser settings.';
                }
                break;
            }
            setError(errorMessage);
            setIsTracking(false);
            setIsLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
          }
        );

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      },
      (err) => {
        let errorMessage = 'Failed to get location';
        switch (err.code) {
          case err.TIMEOUT:
            errorMessage = 'Location request timed out. Please check your internet connection and GPS settings.';
            break;
          case err.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location services in your browser settings.';
            break;
          case err.POSITION_UNAVAILABLE:
            if (isMobile) {
              errorMessage = 'GPS signal not found. Please ensure:\n1. GPS is enabled in your device settings\n2. You are outdoors or near a window\n3. Location services are enabled for this app';
            } else {
              errorMessage = 'Location information unavailable. Please ensure location services are enabled in your browser settings.';
            }
            break;
        }
        setError(errorMessage);
        setIsTracking(false);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      }
    );
  };

  const stopTracking = () => {
    setIsTracking(false);
    setLocation(null);
    setLastUpdate(null);
    setIsLoading(false);
  };

  const openDeviceLocationSettings = () => {
    if (isMobile) {
      if (/Android/i.test(navigator.userAgent)) {
        // For Android, try to open location settings
        window.location.href = 'settings:location';
      } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // For iOS, try to open settings
        window.location.href = 'app-settings:';
      }
    }
  };

  useEffect(() => {
    if (isTracking) {
      const cleanup = startTracking();
      return cleanup;
    }
  }, [isTracking]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {showPermissionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <FaLocationArrow className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enable Location Services</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                To provide you with the best experience, we need access to your location. This will help us track your position and ensure your safety.
              </p>
              {isMobile && (
                <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    <FaMobileAlt className="inline mr-1" />
                    For mobile devices:
                  </p>
                  {/Android/i.test(navigator.userAgent) ? (
                    <ol className="text-sm text-yellow-700 dark:text-yellow-300 list-decimal list-inside mt-2">
                      <li>Open Settings</li>
                      <li>Tap &quot;Location&quot;</li>
                      <li>Turn on &quot;Use location&quot;</li>
                      <li>Select &quot;High accuracy&quot; mode</li>
                      <li>Return to the app and try again</li>
                    </ol>
                  ) : /iPhone|iPad|iPod/i.test(navigator.userAgent) ? (
                    <ol className="text-sm text-yellow-700 dark:text-yellow-300 list-decimal list-inside mt-2">
                      <li>Open Settings</li>
                      <li>Tap &quot;Privacy&quot;</li>
                      <li>Tap &quot;Location Services&quot;</li>
                      <li>Turn on &quot;Location Services&quot;</li>
                      <li>Find your browser and select &quot;While Using&quot;</li>
                      <li>Return to the app and try again</li>
                    </ol>
                  ) : null}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <button
                  onClick={requestLocationPermission}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  Enable Location
                </button>
                {isMobile && (
                  <button
                    onClick={openDeviceLocationSettings}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                  >
                    Open Device Location Settings
                  </button>
                )}
                <button
                  onClick={() => setShowPermissionPopup(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          Location Tracking
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <FaHistory className="inline mr-2" />
            View Details
          </button>
          <button
            onClick={() => isTracking ? stopTracking() : startTracking()}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg ${
              isTracking
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Getting Location...' : isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </button>
        </div>
      </div>

      {location && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Latitude</p>
              <p className="font-mono">{location.latitude.toFixed(6)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Longitude</p>
              <p className="font-mono">{location.longitude.toFixed(6)}</p>
            </div>
          </div>
          {lastUpdate && (
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </div>
      )}

      {!location && !error && !isLoading && (
        <p className="text-gray-500">
          Location tracking is inactive. Click &quot;Start Tracking&quot; to begin.
        </p>
      )}

      {isLoading && !location && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-500">Getting your location...</span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Location Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="space-y-4">
              {location && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Current Location</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Latitude</p>
                      <p className="font-mono">{location.latitude.toFixed(6)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Longitude</p>
                      <p className="font-mono">{location.longitude.toFixed(6)}</p>
                    </div>
                  </div>
                  {lastUpdate && (
                    <p className="text-sm text-gray-500 mt-2">
                      Last updated: {lastUpdate.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              )}

              {locationHistory.length > 0 && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Recent Locations</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {locationHistory.map((loc, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-gray-600 pb-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Latitude</p>
                            <p className="font-mono">{loc.latitude.toFixed(6)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Longitude</p>
                            <p className="font-mono">{loc.longitude.toFixed(6)}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          Time: {new Date(loc.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
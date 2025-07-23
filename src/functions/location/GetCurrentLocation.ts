import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

const GetCurrentLocation = ({
  setLoading,
  setLocation,
}: {
  setLoading: (loading: boolean) => void;
  setLocation: (location: LocationData) => void;
}) => {
  // Create axios instance with defaults
  const geocodeAPI = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    timeout: 5000,
    headers: {
      'User-Agent': 'MyAwesomeApp/1.0',
    },
  });

  const getCurrentLocation = async () => {
    setLoading(true);

    try {
      // Reduce timeout and accuracy requirements for faster response
      const position: Position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false, // Set to false for faster response
          timeout: 5000, // Reduced timeout
          maximumAge: 60000, // Cache location for 1 minute
        });
      });

      const {latitude, longitude} = position.coords;

      // Set location immediately without address
      setLocation({latitude, longitude});

      // Fetch address in background
      reverseGeocode(latitude, longitude)
        .then(address => {
          if (address) {
            setLocation(prev => ({...prev, address}));
          }
        })
        .finally(() => {
          setLoading(false);
        });

      return {latitude, longitude};
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const reverseGeocode = async (
    latitude: number,
    longitude: number,
  ): Promise<string | undefined> => {
    try {
      const {data} = await geocodeAPI.get('/reverse', {
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json',
          // Limit the response data
          addressdetails: 0,
          'accept-language': 'en',
        },
      });

      return data?.display_name;
    } catch (error) {
      console.warn('Geocoding failed:', error);
      return undefined;
    }
  };

  return {
    getCurrentLocation,
  };
};

export default GetCurrentLocation;

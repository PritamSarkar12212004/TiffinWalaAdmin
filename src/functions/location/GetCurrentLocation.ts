import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string | undefined;
}

const GetCurrentLocation = ({
  setLoading,
  setLocation,
}: {
  setLoading: (loading: boolean) => void;
  setLocation: (location: LocationData) => void;
}) => {
  const geocodeAPI = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org',
    timeout: 5000,
    headers: {
      'User-Agent': 'MyAwesomeApp/1.0',
    },
  });
  const getCurrentLocation = async (): Promise<LocationData> => {
    setLoading(true);
    try {
      const position: any = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 60000,
        });
      });
      const {latitude, longitude} = position.coords;
      const address = await reverseGeocode(latitude, longitude);
      const finalLocation: LocationData = {
        latitude,
        longitude,
        address,
      };
      setLocation(finalLocation);
      setLoading(false);
      return finalLocation;
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
          'accept-language': 'en',
        },
      });

      return data?.display_name;
    } catch (error) {
      console.warn('Geocoding failed:', error);
      return undefined;
    }
  };

  return {getCurrentLocation};
};

export default GetCurrentLocation;

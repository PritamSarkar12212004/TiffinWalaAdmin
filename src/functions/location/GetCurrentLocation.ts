import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

interface LocationData {
  latitude: number;
  longitude: number;
  address: string | undefined;
}

const GetCurrentLocation = ({setLoading, setLocation}: any) => {
  const getCurrentLocation = async (): Promise<LocationData> => {
    setLoading(true);

    try {
      const position: any = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 20000, // FIXED: timeout increased
          maximumAge: 5000, // FIXED: use cached location if available
          forceRequestLocation: true,
          showLocationDialog: true,
        });
      });

      const {latitude, longitude} = position.coords;

      const geocodeData = await reverseGeocode(latitude, longitude);

      const finalLocation = {
        latitude,
        longitude,
        address: geocodeData.address,
      };

      setLocation(finalLocation);
      setLoading(false);

      return finalLocation;
    } catch (error: any) {
      setLoading(false);
      console.warn('Location Error:', error?.message);

      throw error;
    }
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const {data} = await axios.get(
        'https://nominatim.openstreetmap.org/reverse',
        {
          params: {
            lat,
            lon,
            format: 'json',
          },
          headers: {
            'User-Agent': 'MyAwesomeApp/1.0',
          },
        },
      );

      return {
        latitude: lat,
        longitude: lon,
        address: data?.display_name,
      };
    } catch (err) {
      console.warn('Reverse Geocode Failed:', err);
      return {
        latitude: lat,
        longitude: lon,
        address: undefined,
      };
    }
  };

  return {getCurrentLocation};
};

export default GetCurrentLocation;

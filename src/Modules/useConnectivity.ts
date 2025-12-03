import {useEffect, useState} from 'react';
import {NativeModules, NativeEventEmitter} from 'react-native';

const {RNConnectivityStatus} = NativeModules;

class ConnectivityManager {
  static _eventEmitter = new NativeEventEmitter(RNConnectivityStatus);

  static addStatusListener(connectivityListener: (event: any) => void) {
    return ConnectivityManager._eventEmitter.addListener(
      'RNConnectivityStatus',
      connectivityListener,
    );
  }

  static isBluetoothEnabled() {
    return RNConnectivityStatus.isBluetoothEnabled();
  }

  static areLocationServicesEnabled() {
    return RNConnectivityStatus.areLocationServicesEnabled();
  }

  static isLocationPermissionGranted() {
    return RNConnectivityStatus.isLocationPermissionGranted();
  }
}

export default function useConnectivity() {
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean | null>(
    null,
  );
  const [locationEnabled, setLocationEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    // listener for native events
    const subscription = ConnectivityManager.addStatusListener(
      ({eventType, status}) => {
        if (eventType === 'bluetooth') {
          setBluetoothEnabled(status);
        } else if (eventType === 'location') {
          setLocationEnabled(status);
        }
      },
    );

    // initial fetch
    (async () => {
      const bt = await ConnectivityManager.isBluetoothEnabled();
      const loc = await ConnectivityManager.areLocationServicesEnabled();
      setBluetoothEnabled(bt);
      setLocationEnabled(loc);
    })();

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    bluetoothEnabled,
    locationEnabled,
  };
}

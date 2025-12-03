import {useEffect, useState} from 'react';
import {NativeModules, NativeEventEmitter} from 'react-native';

const {RNLocationStatus} = NativeModules;

const emitter = new NativeEventEmitter(RNLocationStatus);

export default function useLocationStatus() {
  const [enabled, setEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const sub = emitter.addListener('LocationStatus', event => {
      setEnabled(event.enabled);
    });
    RNLocationStatus.getLocationStatus().then(setEnabled);
    return () => sub.remove();
  }, []);

  return {enabled};
}

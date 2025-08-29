import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import callNotiFy from '../call/callNotiFy';

const requestForNotification = async (settoken: any) => {
  const request = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (request === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Notification permission granted');
    const token = await getNotifiToken();
    settoken(token);
  } else {
    console.log('Notification permission denied');
  }
};
const getNotifiToken = async () => {
  const token = await messaging().getToken();
  callNotiFy(token);
  return token;
};

export default requestForNotification;

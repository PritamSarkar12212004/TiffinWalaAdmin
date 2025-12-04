import {Platform, Alert, PermissionsAndroid} from 'react-native';
import {
  check,
  request,
  RESULTS,
  openSettings,
  PERMISSIONS,
} from 'react-native-permissions';

const usePermissionManager = () => {
  const photoPermissionType = Platform.select({
    android: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  })!;
  const notificationPermissionType = Platform.select({
    android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    ios: PERMISSIONS.IOS.NOTIFICATIONS,
  })!;
  const normalizeStatus = (result: string) => {
    switch (result) {
      case RESULTS.GRANTED:
        return 'granted';

      case RESULTS.LIMITED:
        return 'granted';

      case RESULTS.DENIED:
        return 'denied';

      case RESULTS.BLOCKED:
        return 'blocked';

      default:
        return 'unavailable';
    }
  };
  const checkPhotoPermission = async () => {
    const result = await check(photoPermissionType);
    return normalizeStatus(result);
  };

  const requestPhotoPermission = async () => {
    const result = await request(photoPermissionType);
    const status = normalizeStatus(result);

    if (status === 'blocked') {
      Alert.alert(
        'Photo Permission Blocked',
        'Please enable Photos access from settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: openSettings},
        ],
      );
    }

    return status;
  };
  const checkNotificationPermission = async () => {
    const result = await check(notificationPermissionType);
    return normalizeStatus(result);
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const request = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (request === PermissionsAndroid.RESULTS.GRANTED) {
        return 'granted';
      }
      if (request === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          'Permission Blocked',
          'Please enable notifications from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
        return 'blocked';
      }

      return 'denied';
    }
    const result = await request(notificationPermissionType);
    const status = normalizeStatus(result);

    if (status === 'blocked') {
      Alert.alert(
        'Notifications Disabled',
        'Enable notifications from settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: openSettings},
        ],
      );
    }

    return status;
  };
  return {
    checkPhotoPermission,
    requestPhotoPermission,
    checkNotificationPermission,
    requestNotificationPermission,
  };
};

export default usePermissionManager;

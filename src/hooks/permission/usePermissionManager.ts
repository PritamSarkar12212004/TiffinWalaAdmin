import {Platform, Alert} from 'react-native';
import {
  check,
  request,
  RESULTS,
  openSettings,
  PERMISSIONS,
  Permission,
} from 'react-native-permissions';

const usePermissionManager = () => {
  const androidVersion = Number(Platform.Version) || 0;
  const photoPermissionType: Permission =
    Platform.OS === 'android'
      ? androidVersion >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES // Android 13+
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE // Android 10–12
      : PERMISSIONS.IOS.PHOTO_LIBRARY;
  const mediaLocationPermission =
    Platform.OS === 'android' && androidVersion >= 29 && androidVersion < 33
      ? PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION
      : null;

  const normalizeStatus = (result: string) => {
    switch (result) {
      case RESULTS.GRANTED:
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
    let status = normalizeStatus(result);

    // Request ACCESS_MEDIA_LOCATION for Android 10–11
    if (mediaLocationPermission && status === 'granted') {
      const r2 = await request(mediaLocationPermission);
      const status2 = normalizeStatus(r2);
      if (status2 === 'blocked') {
        Alert.alert(
          'Media Location Blocked',
          'Please enable media location permission from settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: openSettings},
          ],
        );
      }
    }

    if (status === 'blocked') {
      Alert.alert(
        'Permission Blocked',
        'Please enable Photos access from settings.',
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
  };
};

export default usePermissionManager;

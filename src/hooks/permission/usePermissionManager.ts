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
      ? androidVersion >= 338979
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      : PERMISSIONS.IOS.PHOTO_LIBRARY;

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
    const status = normalizeStatus(result);

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

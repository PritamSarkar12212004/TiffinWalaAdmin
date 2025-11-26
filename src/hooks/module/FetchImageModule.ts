import {PermissionsAndroid, Platform} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const FetchImageModule = async () => {
  const requestPermission = async () => {
    if (Platform.OS !== 'android') return true;

    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  const granted = await requestPermission();
  if (!granted) return [];

  let allImages = <any>[];
  let nextCursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await CameraRoll.getPhotos({
      first: 50,
      after: nextCursor,
      assetType: 'Photos',
    });

    allImages = [...allImages, ...response.edges];
    nextCursor = response.page_info.end_cursor;
    hasNextPage = response.page_info.has_next_page;
  }

  return allImages.map((item: any) => item.node.image.uri);
};
export default FetchImageModule;

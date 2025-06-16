import {launchImageLibrary} from 'react-native-image-picker';
import ImageCompresson from './ImageCompresson';
const SingleImgPicker = async ({setMainImage}: any) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    includeBase64: false,
    selectionLimit: 1,
    maxWidth: 1000,
    maxHeight: 1000,
  });
  if (result.assets) {
    let compressImage = await ImageCompresson(result.assets[0].uri);
    setMainImage(compressImage);
  } else {
    console.log('no image selected');
  }
};
export default SingleImgPicker;

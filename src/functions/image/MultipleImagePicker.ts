import {launchImageLibrary} from 'react-native-image-picker';
import ImageCompresson from './ImageCompresson';
const MultipleImagePicker = async ({setMainImage, menuImages}: any) => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    includeBase64: false,
    selectionLimit: 6,
    maxWidth: 1000,
    maxHeight: 1000,
  });
  if (result.assets) {
    result.assets.forEach(async (item: any) => {
      let compressImage = await ImageCompresson(item.uri);
      menuImages.push(compressImage);
      console.log(compressImage);
    });
  } else {
    console.log('no image selected');
  }
};
export default MultipleImagePicker;

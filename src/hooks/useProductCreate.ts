import {useState} from 'react';
import CloudanerysingleImgIpload from '../functions/image/CloudanerysingleImgIpload';

const useProductCreate = () => {
  const [uploadedImagesMenu, setUploadedImagesMenu] = useState<any[]>([]);
  const [uploadedMainImage, setUploadedMainImage] = useState<any>(null);

  const createProduct = async ({
    title,
    description,
    price,
    foodType,
    openDays,
    mainImage,
    menuImages,
    setUploader,
  }: any) => {
    try {
      const uploadedMain = await CloudanerysingleImgIpload(mainImage, 'image');
      setUploadedMainImage(uploadedMain);
      const uploaded = await Promise.all(
        menuImages.map((img: any) => CloudanerysingleImgIpload(img, 'image')),
      );
      setUploadedImagesMenu(uploaded);
    } catch (err) {
      console.error('Image upload failed:', err);
    }
  };

  return {
    createProduct,
  };
};

export default useProductCreate;

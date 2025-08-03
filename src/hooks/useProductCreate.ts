import {useState} from 'react';
import CloudanerysingleImgIpload from '../functions/image/CloudanerysingleImgIpload';
import api from '../util/api/Axios';

interface ProductData {
  title: string;
  description: string;
  price: number;
  foodType: string;
  openDays: string[];
  mainImage: File;
  menuImages: File[];
  adminDatabase: any;
}

const useProductCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (
    {
      title,
      description,
      price,
      foodType,
      openDays,
      mainImage,
      menuImages,
      adminDatabase,
    }: ProductData,
    onSuccess?: () => void,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const uploadedMainImage = await CloudanerysingleImgIpload(
        mainImage,
        'image',
      );

      const uploadedMenuImages = await Promise.all(
        menuImages.map(image => CloudanerysingleImgIpload(image, 'image')),
      );
      await api
        .post('/product/create', {
          title: title,
          description: description,
          price: price,
          foodTypes: foodType,
          availableDays: openDays,
          images: uploadedMainImage,
          menuItems: uploadedMenuImages,
          userId: adminDatabase._id,
          address: adminDatabase.User_Address.address,
          latitude: adminDatabase.User_Address.latitude,
          longitude: adminDatabase.User_Address.longitude,
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Product creation failed:', err);
      setError(err?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error,
  };
};

export default useProductCreate;

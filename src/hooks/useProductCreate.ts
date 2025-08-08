import CloudanerysingleImgIpload from '../functions/image/CloudanerysingleImgIpload';
import api from '../util/api/Axios';

interface ProductData {
  title: string;
  description: string;
  price: any;
  foodType: any;
  openDays: string[];
  mainImage: File;
  menuImages: File[];
  adminDatabase: any;
  setLoading: (loading: boolean) => void;
  fildReseter?: () => void;
  errorHandler?: (err: any) => void;
  setUploadStatus: (status: 'success' | 'error') => void;
}

const useProductCreate = () => {
  const createProduct = async ({
    title,
    description,
    price,
    foodType,
    openDays,
    mainImage,
    menuImages,
    adminDatabase,
    setLoading,
    setUploadStatus,
    fildReseter,
    errorHandler,
  }: ProductData) => {
    console.log(adminDatabase);
    try {
      setLoading(true);
      console.log('🚀 Starting product creation...');

      const uploadedMainImage = await CloudanerysingleImgIpload(
        mainImage,
        'image',
      );

      const uploadedMenuImages = await Promise.all(
        menuImages.map(image => CloudanerysingleImgIpload(image, 'image')),
      );

      await api.post('/product/create', {
        title,
        description,
        price,
        foodTypes: foodType,
        availableDays: openDays,
        images: uploadedMainImage,
        menuItems: uploadedMenuImages,
        userId: adminDatabase.adminMainData._id,
        address: adminDatabase.adminMainData.User_Address.address,
        latitude: adminDatabase.adminMainData.User_Address.latitude,
        longitude: adminDatabase.adminMainData.User_Address.longitude,
      });

      setUploadStatus('success');

      if (fildReseter) fildReseter();
    } catch (err) {
      console.error('❌ Error creating product:', err);
      setUploadStatus('error');
      if (errorHandler) errorHandler(err);
    }
  };

  return {createProduct};
};

export default useProductCreate;

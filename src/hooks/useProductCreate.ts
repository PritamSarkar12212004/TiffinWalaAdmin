import {useNavigation} from '@react-navigation/native';
import ApiCon from '../constant/api/ApiCon';
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
  const navigation = useNavigation();
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
    try {
      setLoading(true);

      // Upload main image
      const uploadedMainImage = await CloudanerysingleImgIpload(
        mainImage,
        'image',
      );

      // Upload menu images
      const uploadedMenuImages = await Promise.all(
        menuImages.map(image => CloudanerysingleImgIpload(image, 'image')),
      );

      // Prepare payload
      const payload = {
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
      };
      await api
        .post(ApiCon.Product.CreateProduct, payload)
        .then(res => {
          setUploadStatus('success');
          fildReseter?.();
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          setLoading(false);
        })
        .catch(err => {
          setUploadStatus('error');
          fildReseter?.();
          setLoading(false);
        });
    } catch (err) {
      console.error('❌ Error creating product:', err);
      setUploadStatus('error');
      errorHandler?.(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return {createProduct};
};

export default useProductCreate;

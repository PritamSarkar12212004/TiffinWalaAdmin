import {useNavigation} from '@react-navigation/native';
import {useNotify} from '../components/wraper/Wraper';
import ApiCon from '../constant/api/ApiCon';
import CloudanerysingleImgIpload from '../functions/image/CloudanerysingleImgIpload';
import api from '../util/api/Axios';

interface ProductData {
  title: string;
  description: string;
  price: any;
  foodType: any;
  openDays: string[];
  mainImage: any;
  menuImages: any[];
  adminDatabase: any;
  setLoading: (loading: boolean) => void;
}

const useProductCreate = () => {
  const {caller} = useNotify();
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
  }: ProductData) => {
    try {
      console.log(adminDatabase.adminMainData?.User_Address?.latitude);
      setLoading(true);
      const uploadedMainImage = await CloudanerysingleImgIpload(
        mainImage,
        'image',
      );
      const uploadedMenuImages = await Promise.all(
        menuImages.map(img => CloudanerysingleImgIpload(img, 'image')),
      );

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
        latitude:
          adminDatabase.adminMainData?.User_Address?.latitude ??
          adminDatabase.adminMainData?.User_Address?.coords?.latitude,

        longitude:
          adminDatabase.adminMainData?.User_Address?.longitude ??
          adminDatabase.adminMainData?.User_Address?.coords?.longitude,
      };
      await api.post(ApiCon.Product.CreateProduct, payload);

      caller({
        message: 'Post Created',
        description: 'Your mess post has been published.',
        type: 'success',
      });

      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    } catch (err) {
      caller({
        message: 'Creation Failed',
        description: 'Could not publish your mess post. Try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return {createProduct};
};

export default useProductCreate;

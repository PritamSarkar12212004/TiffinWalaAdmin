import {useState} from 'react';
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
  setLoading: any;
  fildReseter: Function;
  errorHandler: any;
  setUploadStatus: any;
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
    fildReseter,
    errorHandler,
    setUploadStatus,
  }: ProductData) => {
    setLoading(true);
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
        fildReseter();
      })
      .catch(err => {
        console.log(err);
        setUploadStatus('error');
        // errorHandler(null);
      });
  };

  return {
    createProduct,
  };
};

export default useProductCreate;

import {CommonActions, useNavigation} from '@react-navigation/native';
import CloudanerysingleImgIpload from '../../../../functions/image/CloudanerysingleImgIpload';
import api from '../../../../util/api/Axios';
import {userContext} from '../../../../util/context/ContextProvider';
import ApiCon from '../../../../constant/api/ApiCon';
import {useNotify} from '../../../../components/wraper/Wraper';

const useUpdateProfile = () => {
  const {setAdminDatabase} = userContext();
  const navigation = useNavigation();
  const {caller} = useNotify();
  const updateProfile = async ({
    payload,
    payloadHelper,
  }: {
    payload: {
      id: any;
      name: any;
      email: any;
      phone: any;
      address: any;
      bio: any;
      gender: any;
      profileImage: any;
      selectImage: any;
      latitude: any;
      longitude: any;
    };
    payloadHelper: {
      setLoading: any;
    };
  }) => {
    await api
      .post(ApiCon.Upload.productUpload, {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        bio: payload.bio,
        gender: payload.gender,
        image: payload.selectImage
          ? await CloudanerysingleImgIpload(payload.selectImage, 'image')
          : payload.profileImage,
        latitude: payload.latitude,
        longitude: payload.longitude,
      })
      .then(async res => {
        payloadHelper.setLoading(false);
        await setAdminDatabase({
          AdminFollowers: res.data.productData.AdminFollowers,
          AdminTotoalLikes: res.data.productData.ProductTotalLike,
          AdminProducts: res.data.productData.AdminProducts,
          AdminTotoalViwers: res.data.productData.ProductTotalViews,
          adminMainData: res.data.data,
          ProductData: res.data.productData.productData,
        });
        caller({
          message: 'Profile Updated',
          description: 'Your changes have been saved.',
          type: 'success',
        });
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
      })
      .catch(err => {
        caller({
          message: 'Oops!',
          description: 'Could not connect to the server.',
          type: 'danger',
        });
      });
  };
  return {updateProfile};
};

export default useUpdateProfile;

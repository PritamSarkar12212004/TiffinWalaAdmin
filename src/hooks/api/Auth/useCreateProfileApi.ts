import Token from '../../../constant/tokens/Token';
import setStorage from '../../../functions/token/setStorage';
import api from '../../../util/api/Axios';
const useCreateProfileApi = () => {
  const productCount = async (length: any) => {
    if (length <= 0) {
      setStorage(Token.DataToken.UserProductCount, false);
    } else {
      setStorage(Token.DataToken.UserProductCount, true);
    }
    return true;
  };

  const createProfile = ({data, navigation}: any) => {
    api
      .post('/auth/profile-create', {
        Description: data.Description,
        Name: data.Name,
        email: data.email,
        phone: data.phone,
        profileImage: data.profileImage,
        location: data.location,
        gender: data.gender,
      })
      .then(async res => {
        await Promise.all([
          await productCount(res.data.data.User_Post_Count),
          setStorage(Token.DataToken.UserInformation, res.data.data),
          setStorage(Token.DataToken.UserLocation, res.data.data.User_Address),
          setStorage(Token.AuthToken.IsSignToken, true),
        ])
          .then(() => {
            navigation.replace('DonePage');
          })
          .catch(err => {
            console.error('Error setting storage:', err);
            navigation.replace('ErrorPage');
          });
      })
      .catch(err => {
        console.log(err);
        navigation.replace('ErrorPage');
      });
  };
  return {
    createProfile,
  };
};

export default useCreateProfileApi;

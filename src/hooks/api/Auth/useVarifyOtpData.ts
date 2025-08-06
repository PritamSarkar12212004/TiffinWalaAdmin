import Token from '../../../constant/tokens/Token';
import setStorage from '../../../functions/token/setStorage';
import api from '../../../util/api/Axios';
const useVarifyOtpData = () => {
  const productCount = async (length: any) => {
    if (length <= 0) {
      setStorage(Token.DataToken.UserProductCount, false);
    } else {
      setStorage(Token.DataToken.UserProductCount, true);
    }
    return true;
  };

  const varifyOtpData = async (
    status: any,
    phone: any,
    navigation: any,
    CommonActions: any,
  ) => {
    await api
      .post('/auth/otp/provide-data', {
        status: status,
        number: phone,
      })
      .then(async res => {
        if (!res.data.login || !res.data.data) {
          navigation.navigate('UserProfileSetup', {
            phone: phone,
          });
        } else {
          await Promise.all([
            productCount(res.data.data.User_Post_Count),
            setStorage(Token.DataToken.UserInformation, res.data.data),
            setStorage(
              Token.DataToken.UserLocation,
              res.data.data.User_Address,
            ),
            setStorage(Token.AuthToken.IsSignToken, true),
          ])
            .then(() => {
              navigation.replace('DonePage');
            })
            .catch(err => {
              console.error('Error setting storage:', err);
              navigation.replace('ErrorPage');
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {varifyOtpData};
};

export default useVarifyOtpData;

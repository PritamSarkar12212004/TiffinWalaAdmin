import ApiCon from '../../../constant/api/ApiCon';
import Token from '../../../constant/tokens/Token';
import CloudanerysingleImgIpload from '../../../functions/image/CloudanerysingleImgIpload';
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

  const createProfile = async ({data, navigation}: any) => {
    await CloudanerysingleImgIpload(data.profileImage, 'image')
      .then(async result => {
        await api
          .post(ApiCon.AuthCall.createProfile, {
            Description: data.Description,
            Name: data.Name,
            email: data.email,
            phone: data.phone,
            profileImage: result,
            location: data.location,
            gender: data.gender,
          })
          .then(async res => {
            await Promise.all([
              setStorage(
                Token.PrivacyToken.DataAnalays.KeepHistory,
                res.data.data.UserPrivacyOptions.DataAnalytics.KeepHistory,
              ),
              setStorage(
                Token.PrivacyToken.DataAnalays.AllowDataSharing,
                res.data.data.UserPrivacyOptions.DataAnalytics.AllowDataSharing,
              ),
              setStorage(
                Token.PrivacyToken.DataAnalays.AnalaticData,
                res.data.data.UserPrivacyOptions.DataAnalytics.AnalyticData,
              ),
              productCount(res.data.data.User_Post_Count),
              setStorage(Token.DataToken.UserInformation, res.data.data),
              setStorage(
                Token.DataToken.UserLocation,
                res.data.data.User_Address,
              ),
              setStorage(Token.AuthToken.IsSignToken, true),
              setStorage(
                Token.PrivacyToken.Profile.ShowEmail,
                res.data.data.UserPrivacyOptions.Profile.ShowEmail,
              ),
              setStorage(
                Token.PrivacyToken.Profile.ShowLocation,
                res.data.data.UserPrivacyOptions.Profile.ShowLocation,
              ),
              setStorage(
                Token.PrivacyToken.Notification.AllowPsuhNotifications,
                res.data.data.UserPrivacyOptions.Notification
                  .AllowPushNotifications,
              ),
              setStorage(
                Token.PrivacyToken.Notification.AllowMarketing,
                res.data.data.UserPrivacyOptions.Notification.AllowMarketing,
              ),
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

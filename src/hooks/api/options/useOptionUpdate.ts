import Token from '../../../constant/tokens/Token';
import setStorage from '../../../functions/token/setStorage';
import api from '../../../util/api/Axios';

const useOptionUpdate = () => {
  const updateOption = async ({
    payload,
  }: {
    payload: {
      id: any;
      path: any;
      value: any;
    };
  }) => {
    api
      .post('/option/controll-options', {
        id: payload.id,
        path: payload.path,
        value: payload.value,
      })
      .then(res => {
        console.log(res.data.data);
        if (payload.path === 'Notification.AllowPushNotifications') {
          setStorage(
            Token.PrivacyToken.Notification.AllowPsuhNotifications,
            res.data.data,
          );
        } else {
          setStorage(Token.PrivacyToken.Profile.ShowLocation, res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {updateOption};
};

export default useOptionUpdate;

import ApiCon from '../../../../constant/api/ApiCon';
import api from '../../../../util/api/Axios';
const useTokenGet = () => {
  const tokenSet = (token: any, userId: any) => {
    api.post(ApiCon.Notification.GetToken, {
      token: token,
      userId: userId,
    });
  };
  return {
    tokenSet,
  };
};

export default useTokenGet;

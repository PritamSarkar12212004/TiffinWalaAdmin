import api from '../../../../util/api/Axios';
const useTokenGet = () => {
  const tokenSet = (token: any, userId: any) => {
    console.log(userId);
    api.post('notification/noti-get-token', {
      token: token,
      userId: userId,
    });
  };
  return {
    tokenSet,
  };
};

export default useTokenGet;

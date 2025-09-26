import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';
const useLoginApi = () => {
  const login = async (phone: any, setloading: any, Routenavigation: any) => {
    await api
      .post(ApiCon.AuthCall.loginOtp, {
        number: phone,
      })
      .then(res => {
        setloading(false);
        if (res.status == 200) {
          Routenavigation.navigate('OtpVerifyScreen', {
            otp: res.data.data.data.otp,
            phone: res.data.data.data.phoneNumber,
          });
        }
      })
      .catch(() => {
        setloading(false);
      });
  };
  return {login};
};

export default useLoginApi;

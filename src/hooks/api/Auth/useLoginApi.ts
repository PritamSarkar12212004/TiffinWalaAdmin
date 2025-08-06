import api from '../../../util/api/Axios';

const useLoginApi = () => {
  const login = async (phone: any, setloading: any, Routenavigation: any) => {
    await api
      .post('/auth/otp', {
        number: phone,
      })
      .then(res => {
        setloading(false);
        if (res.status == 200) {
          Routenavigation.navigate('OtpVerifyScreen', {
            otp: res.data.data.otp,
            phone: res.data.data.phoneNumber,
          });
        }
      })
      .catch(err => {
        setloading(false);
      });
  };
  return {login};
};

export default useLoginApi;

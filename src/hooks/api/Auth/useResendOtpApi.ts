import api from '../../../util/api/Axios';

const useResendOtpApi = () => {
  const ResendApi = async (phone: any, setNavigateOtp: any, setTimer: any) => {
    console.log(phone);
    await api
      .post('/auth/otp', {
        number: phone,
      })
      .then(res => {
        setNavigateOtp(res.data.data.otp);
        setTimer(30);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {ResendApi};
};

export default useResendOtpApi;

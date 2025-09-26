import {useNotify} from '../../../components/wraper/Wraper';
import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useLoginApi = () => {
  const {caller} = useNotify();
  const login = async (phone: any, setloading: any, Routenavigation: any) => {
    await api
      .post(ApiCon.AuthCall.loginOtp, {
        number: phone,
      })
      .then(res => {
        setloading(false);
        if (res.status == 200) {
          caller({
            message: 'Success',
            description: 'OTP sent on WhatsApp.',
            type: 'success',
          });
          Routenavigation.navigate('OtpVerifyScreen', {
            otp: res.data.data.data.otp,
            phone: res.data.data.data.phoneNumber,
          });
        }
      })
      .catch(err => {
        setloading(false);
        caller({
          message: 'OTP Not Sent',
          description: 'WhatsApp delivery failed. Try again.',
          type: 'danger',
        });
      });
  };
  return {login};
};

export default useLoginApi;

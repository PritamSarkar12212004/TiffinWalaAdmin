import {useNotify} from '../../../components/wraper/Wraper';
import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useResendOtpApi = () => {
  const {caller} = useNotify();
  const ResendApi = async (phone: any, setNavigateOtp: any, setTimer: any) => {
    await api
      .post(ApiCon.AuthCall.loginOtp, {
        number: phone,
      })
      .then(res => {
        setNavigateOtp(res.data.data.otp);
        caller({
          message: 'OTP Resent',
          description: 'A new OTP has been sent to your number.',
          type: 'success',
        });
        setTimer(30);
      })
      .catch(() => {
        caller({
          message: 'Resend Failed',
          description: 'Could not send OTP. Try again.',
          type: 'danger',
        });
      });
  };
  return {ResendApi};
};

export default useResendOtpApi;

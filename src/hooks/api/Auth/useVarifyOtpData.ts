import api from '../../../util/api/Axios';

const useVarifyOtpData = () => {
  const varifyOtpData = async (status: any, phone: any, navigation: any) => {
    await api
      .post('/auth/otp/provide-data', {
        status: status,
        number: phone,
      })
      .then(res => {
        if (res.data.login) {
          console.log('login');
        } else {
          navigation.navigate('UserProfileSetup');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {varifyOtpData};
};

export default useVarifyOtpData;

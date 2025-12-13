import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';
import DeviceInfo from 'react-native-device-info';

const useUpdateChaker = () => {
  const version = DeviceInfo.getVersion();
  const apiCall = async () => {
    try {
      const res = await api.post(ApiCon.Update.AppUpdateChaker, {
        payload: {
          version: version,
        },
      });
      return res.data.data;
    } catch (error) {
      console.log('Update Check Error:', error);
      return null;
    }
  };

  return {apiCall};
};

export default useUpdateChaker;

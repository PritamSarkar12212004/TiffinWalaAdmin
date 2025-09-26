import ApiCon from '../../../constant/api/ApiCon';
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
      token: any;
    };
  }) => {
    api
      .post(ApiCon.Options.ControllOption, {
        id: payload.id,
        path: payload.path,
        value: payload.value,
      })
      .then(res => {
        setStorage(payload.token, res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {updateOption};
};

export default useOptionUpdate;

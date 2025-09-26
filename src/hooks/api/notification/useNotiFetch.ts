import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useNotiFetch = () => {
  const fetchNoti = ({
    id,
    setdata,
    setLoading,
  }: {
    id: any;
    setdata: any;
    setLoading: any;
  }) => {
    api
      .post(ApiCon.Notification.FetchNotification, {
        payload: {
          id: id,
        },
      })
      .then(res => {
        console.log(res.data.data);
        setdata(res.data.data);
        setLoading(false);
        return true;
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        return false;
      });
  };
  return {
    fetchNoti,
  };
};

export default useNotiFetch;

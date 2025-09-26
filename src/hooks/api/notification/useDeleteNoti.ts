import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useDeleteNoti = () => {
  const deleteNoti = (id: any) => {
    api
      .post(ApiCon.Notification.DeleteNotification, {
        payload: {
          id: id,
        },
      })
      .then(res => {
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    deleteNoti,
  };
};

export default useDeleteNoti;

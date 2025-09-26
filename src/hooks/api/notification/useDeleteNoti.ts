import {useNotify} from '../../../components/wraper/Wraper';
import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useDeleteNoti = () => {
  const {caller} = useNotify();
  const deleteNoti = (id: any) => {
    api
      .post(ApiCon.Notification.DeleteNotification, {
        payload: {
          id: id,
        },
      })
      .then(res => {
        caller({
          message: 'Deleted',
          description: 'Item has been removed successfully.',
          type: 'success',
        });
      })
      .catch(err => {
        caller({
          message: 'Oops!',
          description: 'Could not connect to the server.',
          type: 'danger',
        });
      });
  };
  return {
    deleteNoti,
  };
};

export default useDeleteNoti;

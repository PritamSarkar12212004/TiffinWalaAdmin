import {useNotify} from '../../../components/wraper/Wraper';
import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useDeleteFollower = () => {
  const {caller} = useNotify();
  const deleteFollower = (id: any) => {
    api
      .post(ApiCon.ProductControll.deleteFollower, {
        payload: {
          id: id,
        },
      })
      .then(res => {
        caller({
          message: 'Success',
          description: 'Follower removed successfully.',
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
    deleteFollower,
  };
};

export default useDeleteFollower;

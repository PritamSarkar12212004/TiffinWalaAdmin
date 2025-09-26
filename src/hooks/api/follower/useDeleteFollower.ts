import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useDeleteFollower = () => {
  const deleteFollower = (id: any) => {
    api
      .post(ApiCon.ProductControll.deleteFollower, {
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
    deleteFollower,
  };
};

export default useDeleteFollower;

import api from '../../../util/api/Axios';

const useDeleteFollower = () => {
  const deleteFollower = (id: any) => {
    api
      .post('/follower/delete-data', {
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

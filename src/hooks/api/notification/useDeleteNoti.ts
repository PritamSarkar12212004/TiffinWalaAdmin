import api from '../../../util/api/Axios';

const useDeleteNoti = () => {
  const deleteNoti = (id: any) => {
    api
      .post('/notification/delete-noti', {
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

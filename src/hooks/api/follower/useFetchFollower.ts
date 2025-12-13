import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';

const useFetchFollower = () => {
  const fetchFollower = ({id, setLoading, setData}: any) => {
    api
      .post(ApiCon.ProductControll.followerFetch, {
        payload: {
          id: id,
        },
      })
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setData(null);
        setLoading(false);
      });
  };
  return {fetchFollower};
};

export default useFetchFollower;

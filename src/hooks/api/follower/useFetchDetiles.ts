import ApiCon from '../../../constant/api/ApiCon';
import api from '../../../util/api/Axios';
const useFetchDetiles = () => {
  const fetchDetiles = ({
    payload,
    setLoadingFetch,
    setFetchDetiles,
  }: {
    payload: string;
    setLoadingFetch: any;
    setFetchDetiles: any;
  }) => {
    api
      .post(ApiCon.ProductControll.followerFetchDetiles, {
        payload: payload,
      })
      .then(res => {
        setFetchDetiles(res.data.data);
        setLoadingFetch({
          status: false,
          id: null,
        });
      })
      .catch(er => {
        console.log(er);
        setLoadingFetch({
          status: false,
          id: null,
        });
      });
  };
  return {
    fetchDetiles,
  };
};

export default useFetchDetiles;

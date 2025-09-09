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
      .post('/follower/fetch-detiles', {
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

import api from '../../../../util/api/Axios';

const useMainDataRicive = () => {
  const riciveData = async (phone: any, setAdminDatabase: any) => {
    console.log(phone);
    await api
      .post('/data-provider/main-data', {
        phone: phone,
      })
      .then(res => {
        console.log(res);
        setAdminDatabase(res.data.data);
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  return {riciveData};
};

export default useMainDataRicive;

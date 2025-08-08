import Token from '../../../../constant/tokens/Token';
import getStorage from '../../../../functions/token/getStorage';
import api from '../../../../util/api/Axios';

const useMainDataRicive = () => {
  const riciveData = async (
    phone: any,
    setAdminDatabase: any,
    setAdminProductCount: any,
  ) => {
    await api
      .post('/data-provider/main-data', {
        phone: phone,
      })
      .then(async res => {
        await getStorage(Token.DataToken.UserProductCount).then(res => {
          setAdminProductCount(res);
        });
        setAdminDatabase({
          AdminFollowers: res.data.productData.AdminFollowers,
          AdminTotoalLikes: res.data.productData.ProductTotalLike,
          AdminProducts: res.data.productData.AdminProducts,
          AdminTotoalViwers: res.data.productData.ProductTotalViews,
          adminMainData: res.data.data,
          ProductData: res.data.productData.productData,
        });
        return true;
      })
      .catch(err => {
        console.log(err);
        return null;
      });
  };
  return {riciveData};
};

export default useMainDataRicive;

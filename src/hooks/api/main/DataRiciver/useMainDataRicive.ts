import ApiCon from '../../../../constant/api/ApiCon';
import Token from '../../../../constant/tokens/Token';
import getStorage from '../../../../functions/token/getStorage';
import api from '../../../../util/api/Axios';
import {userContext} from '../../../../util/context/ContextProvider';

const useMainDataRicive = () => {
  const {setProductData} = userContext();
  const riciveData = async (
    phone: any,
    setAdminDatabase: any,
    setAdminProductCount: any,
  ) => {
    await api
      .post(ApiCon.Main.DataProvider, {
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
          followerList: res.data.productData.followerList,
        });
        setProductData(res.data.productData.productData);
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

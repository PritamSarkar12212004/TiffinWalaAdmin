import ApiCon from '../../../../constant/api/ApiCon';
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
        setAdminProductCount(res.data.data.User_Post_Count);
        setAdminDatabase({
          AdminFollowers: res.data.productData.AdminFollowers,
          AdminTotoalLikes: res.data.productData.ProductTotalLike,
          AdminProducts: res.data.productData.AdminProducts,
          AdminTotoalViwers: res.data.productData.ProductTotalViews,
          adminMainData: res.data.data,
          ProductData: res.data.productData.productData,
          followerList: res.data.productData.followerList,
          wicklyTrafic: res.data.data.WeeklyTraffic,
          monthlyTrafic: res.data.data.MonthlyTraffic,
        });
        setProductData(res.data.productData.productData);
        console.log(res.data.data.data);
        return true;
      })
      .catch(err => {
        console.log(err.response);
        return null;
      });
  };
  return {riciveData};
};

export default useMainDataRicive;

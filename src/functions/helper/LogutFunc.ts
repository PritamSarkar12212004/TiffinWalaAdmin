import Token from '../../constant/tokens/Token';
import deleteStorage from '../token/deleteStorage';

const LogutFunc = async ({navigation, CommonActions}: any) => {
  await Promise.all([
    deleteStorage(Token.AuthToken.IsSignToken),
    deleteStorage(Token.DataToken.UserInformation),
    deleteStorage(Token.DataToken.UserLocation),
    deleteStorage(Token.DataToken.UserProductCount),
  ]);

  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: 'Auth'}],
    }),
  );
};
export default LogutFunc;

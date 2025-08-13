import './global.css';
import './gesture-handler';
import React, { Fragment, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import MainNavigation from './src/navigation/main/MainNavigation';
import MainStacknavigation from './src/navigation/main/MainStacknavigation';
import AuthNavigation from './src/navigation/auth/AuthNavigation';

import getStorage from './src/functions/token/getStorage';
import Token from './src/constant/tokens/Token';
import AnimationComp from './src/components/elements/AnimationComp';
import Animation from './src/constant/animation/Animation';

import { ContextProvider, userContext } from './src/util/context/ContextProvider';

const Stack = createNativeStackNavigator();

const RouteHandler = ({ setHandleRoute }: any) => {
  const { setAdminLocalData } = userContext();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isSignedIn = await getStorage(Token.AuthToken.IsSignToken);
        if (isSignedIn) {
          const userInfo = await getStorage(Token.DataToken.UserInformation);
          if (userInfo) {
            await setAdminLocalData(userInfo);
            setHandleRoute('Home');
          } else {
            setHandleRoute('Auth');
          }
        } else {
          setHandleRoute('Auth');
        }
      } catch (err) {
        setHandleRoute('Auth');
      }
    };

    checkAuth();
  }, []);

  return null; // No UI, only logic
};

const App = () => {
  const [handleRoute, setHandleRoute] = useState<any | null>(null);

  return (
    <ContextProvider>
      <RouteHandler setHandleRoute={setHandleRoute} />
      <NavigationContainer>
        {handleRoute ? (
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={handleRoute}>
            <Fragment>
              <Stack.Screen name="Auth" component={AuthNavigation} />
              <Stack.Screen name="Home" options={{
                animation: 'slide_from_right',
              }} component={MainNavigation} />
              <Stack.Screen name="page" options={{
                animation: 'slide_from_right',
              }} component={MainStacknavigation} />
            </Fragment>
          </Stack.Navigator>
        ) : (
          <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'white' }}>
            <AnimationComp path={Animation.LoadingAnimation} width={300} height={300} />
          </View>
        )}
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;

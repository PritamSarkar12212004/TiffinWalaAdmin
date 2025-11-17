import './global.css';
import './gesture-handler';
import React, { Fragment, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MainNavigation from './src/navigation/main/MainNavigation';
import MainStacknavigation from './src/navigation/main/MainStacknavigation';
import AuthNavigation from './src/navigation/auth/AuthNavigation';
import getStorage from './src/functions/token/getStorage';
import Token from './src/constant/tokens/Token';
import { ContextProvider, userContext } from './src/util/context/ContextProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Wraper from './src/components/wraper/Wraper';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const [handleRoute, setHandleRoute] = useState<any | null>(null);
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

  return (
    <NavigationContainer>
      {handleRoute ? (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={handleRoute}>
          <Stack.Screen name="Auth" component={AuthNavigation} />
          <Stack.Screen
            name="Home"
            options={{ animation: 'slide_from_right' }}
            component={MainNavigation}
          />
          <Stack.Screen
            name="page"
            options={{ animation: 'slide_from_right' }}
            component={MainStacknavigation}
          />
        </Stack.Navigator>
      ) : (
        <View className="flex-1 flex justify-center items-center" style={{ backgroundColor: 'white' }}>
          <ActivityIndicator color={"black"} size={"small"} />
        </View>
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Fragment>
      <GestureHandlerRootView style={styles.container}>
        <ContextProvider>
          <Wraper>
            <AppContent />
          </Wraper>
        </ContextProvider>
      </GestureHandlerRootView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});

export default App;
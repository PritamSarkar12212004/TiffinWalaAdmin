import "./global.css"
import './gesture-handler';
import React, { Fragment, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from "./src/navigation/main/MainNavigation";
import MainStacknavigation from "./src/navigation/main/MainStacknavigation";
import AuthNavigation from "./src/navigation/auth/AuthNavigation";
import { View } from "react-native";
import getStorage from "./src/functions/token/getStorage";
import Token from "./src/constant/tokens/Token";
import AnimationComp from "./src/components/elements/AnimationComp";
import Animation from "./src/constant/animation/Animation";

const Stack = createNativeStackNavigator()
const App = () => {
  const [handleRoute, setHandleRoute] = useState<any | null>(null);
  useEffect(() => {
    getStorage(Token.AuthToken.IsSignToken).then((res) => {
      if (res) {
        getStorage(Token.DataToken.UserInformation).then((userInfo) => {
          if (userInfo) {
            setHandleRoute("Home");
          } else {
            setHandleRoute("Auth");
          }
        }).catch(() => {
          setHandleRoute("Auth");
        });
      } else {
        setHandleRoute("Auth");
      }
    }).catch(() => {
      setHandleRoute("Auth");
    });
  }, [])
  return (
    <NavigationContainer>
      {
        handleRoute ? <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={handleRoute}
        >
          <Fragment>
            <Stack.Screen name="Auth" component={AuthNavigation} />
            <Stack.Screen name="Home" component={MainNavigation} />
            <Stack.Screen name="page" component={MainStacknavigation} />
          </Fragment>
        </Stack.Navigator> : <View className="flex-1 justify-center items-center" style={{ backgroundColor: "white" }}>
          <AnimationComp path={Animation.LoadingAnimation} width={300} height={300} />
        </View>
      }
    </NavigationContainer>
  )
}

export default App
import "./global.css"
import './gesture-handler';
import React, { Fragment, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from "./src/navigation/main/MainNavigation";
import MainStacknavigation from "./src/navigation/main/MainStacknavigation";
import AuthNavigation from "./src/navigation/auth/AuthNavigation";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator()
const App = () => {
  const [handleRoute, setHandleRoute] = useState<any | null>(null);
  useEffect(() => {
    setHandleRoute("Auth");
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
          <ActivityIndicator size={"large"} color={"blue"} />
        </View>
      }
    </NavigationContainer>
  )
}

export default App
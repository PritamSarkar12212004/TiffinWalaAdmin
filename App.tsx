import "./global.css"
import './gesture-handler';
import React, { Fragment, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from "./src/navigation/main/MainNavigation";
import MainStacknavigation from "./src/navigation/main/MainStacknavigation";
import AuthNavigation from "./src/navigation/auth/AuthNavigation";

const Stack = createNativeStackNavigator()
const App = () => {
  const [auth, setauth] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={auth ? "Home" : "Auth"}
      >
        {auth ? (
          <Fragment>
            <Stack.Screen name="Home" component={MainNavigation} />
            <Stack.Screen name="page" component={MainStacknavigation} />
          </Fragment>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
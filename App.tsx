import "./global.css"
import './gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigation from "./src/navigation/main/MainNavigation";
import MainStacknavigation from "./src/navigation/main/MainStacknavigation";


const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={MainNavigation} />
        <Stack.Screen name="page" component={MainStacknavigation} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App
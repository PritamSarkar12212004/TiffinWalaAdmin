import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import OtpVerifyScreen from '../../screens/auth/OtpVerifyScreen';
const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='OtpVerifyScreen' component={OtpVerifyScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigation
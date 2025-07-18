import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import OtpVerifyScreen from '../../screens/auth/OtpVerifyScreen';
import UserProfileSetup from '../../screens/auth/UserProfileSetup';
const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='OtpVerifyScreen' component={OtpVerifyScreen} />
            <Stack.Screen name='UserProfileSetup' component={UserProfileSetup} />
        </Stack.Navigator>
    )
}

export default AuthNavigation
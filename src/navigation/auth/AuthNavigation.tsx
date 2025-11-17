import React, { Fragment } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import OtpVerifyScreen from '../../screens/auth/OtpVerifyScreen';
import UserProfileSetup from '../../screens/auth/UserProfileSetup';
import UseLocationSetup from '../../screens/auth/UseLocationSetup';
import MainProfileSetup from '../../screens/auth/MainProfileSetup';
import DonePage from '../../screens/auth/DonePage';
import ErrorPage from '../../screens/auth/ErrorPage';
const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }} initialRouteName='LoginScreen'>
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name='OtpVerifyScreen' component={OtpVerifyScreen} options={{
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name='UserProfileSetup' component={UserProfileSetup} options={{
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name='UseLocationSetup' component={UseLocationSetup} options={{
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name='MainProfileSetup' component={MainProfileSetup} options={{
                animation: 'fade'
            }} />
            <Stack.Screen name='DonePage' component={DonePage} options={{
                animation: 'fade'
            }} />
            <Stack.Screen name='ErrorPage' component={ErrorPage} options={{
                animation: 'fade'
            }} />
        </Stack.Navigator>
    )
}

export default AuthNavigation
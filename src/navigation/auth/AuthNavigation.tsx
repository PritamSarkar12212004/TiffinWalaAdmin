import React, { Fragment } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/auth/LoginScreen';
import OtpVerifyScreen from '../../screens/auth/OtpVerifyScreen';
import UserProfileSetup from '../../screens/auth/UserProfileSetup';
import { StatusBar } from 'react-native';
import UserFormProfile from '../../screens/auth/UserFormProfile';
import UserLocationSetup from '../../screens/auth/UserLocationSetup';
const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <Fragment>
            <StatusBar barStyle={'dark-content'} />
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} initialRouteName='UserProfileSetup'>
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='OtpVerifyScreen' component={OtpVerifyScreen} />
                <Stack.Screen name='UserProfileSetup' component={UserProfileSetup} />
                <Stack.Screen name='UserFormProfile' component={UserFormProfile} />
                <Stack.Screen name='UserLocationSetup' component={UserLocationSetup} />
            </Stack.Navigator>
        </Fragment>
    )
}

export default AuthNavigation
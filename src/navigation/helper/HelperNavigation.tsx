import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SubpageWraper from '../../layout/wraper/SubpageWraper';
import PermissionManager from '../../screens/helper/PermissionManager';
const Stack = createStackNavigator();

const HelperNavigation = () => {
    return (
        <SubpageWraper>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='PermissionManager' component={PermissionManager} />
            </Stack.Navigator>
        </SubpageWraper>
    )
}

export default HelperNavigation
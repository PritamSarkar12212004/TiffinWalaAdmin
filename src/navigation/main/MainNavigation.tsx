// navigation/MainNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashBoard from '../../screens/main/DashBoard';
import DashBoardWraper from '../../layout/wraper/DashBoardWraper';
import Notification from '../../screens/main/Notification';
import Profile from '../../screens/main/Profile';
import Risehand from '../../screens/main/Risehand';
import UploadTermPage from '../../screens/main/UploadTermPage';
import TabbarComponent from '../../components/global/tabbar/TabbarComponent';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <DashBoardWraper>
            <Tab.Navigator
                initialRouteName='DashBoard'
                tabBar={props => <TabbarComponent {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="DashBoard"
                    component={DashBoard}
                />
                <Tab.Screen
                    name="Risehand"
                    component={Risehand}
                />
                <Tab.Screen
                    name="UploadProduct"
                    component={UploadTermPage}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                />
            </Tab.Navigator>
        </DashBoardWraper>
    );
};

export default MainNavigation;
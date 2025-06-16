import React from 'react'
import DashBoard from '../../screens/main/DashBoard';
import DashBoardWraper from '../../layout/wraper/DashBoardWraper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../../screens/main/Notification';
import Profile from '../../screens/main/Profile';
import UploadProduct from '../../screens/main/UploadProduct';
import Icon from '../../MainLogo/icon/Icon';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Risehand from '../../screens/main/Risehand';
import Logo from '../../constant/logo/Logo';
const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <DashBoardWraper>
            <Tab.Navigator initialRouteName='DashBoard' screenOptions={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TouchableOpacity activeOpacity={0.9} {...props} android_ripple={{ color: 'transparent' }} />
                ,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    height: 80,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    paddingBottom: 20,
                    paddingTop: 20,
                    elevation: 0,
                    shadowOpacity: 0,
                    borderTopColor: 'transparent',
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30
                },
                header(prop) {
                    return <View className='w-full flex flex-row items-center justify-between h-28 px-3 pt-0 '>
                        <View className='flex flex-row gap-3 h-full items-center justify-center'>
                            <TouchableOpacity className='h-16 w-16 bg-white rounded-full flex items-center justify-center'>
                                <Image source={Logo.MainLogo} className='h-12 w-12 rounded-full' resizeMode='cover' />
                            </TouchableOpacity>
                            <View className='flex   justify-between '>
                                <Text className=' text-xl font-bold text-[#FF7622]'>
                                    Tiffin Wala
                                </Text>
                            </View>
                        </View>
                        <View className='flex h-full  items-center justify-center' >
                            <TouchableOpacity className='h-16 w-16 bg-[#98A8B8] rounded-full flex items-center justify-center'>

                            </TouchableOpacity>
                        </View>
                    </View>
                },
            }}>
                <Tab.Screen name="DashBoard" component={DashBoard} options={{
                    tabBarIcon: ({ focused }) => (
                        < Icon name='house' type='solid' color={focused ? "#FF7622" : "gray"} size={25} />
                    ),
                    tabBarActiveTintColor: '#FF7622',
                    tabBarInactiveTintColor: '#000',
                }} />
                <Tab.Screen name="Risehand" component={Risehand} options={{
                    tabBarIcon: ({ focused }) => (
                        < Icon name='map-pin' type='solid' color={focused ? "#FF7622" : "gray"} size={25} />
                    ),
                    tabBarActiveTintColor: '#FF7622',
                    tabBarInactiveTintColor: '#000',
                }} />
                <Tab.Screen name="UploadProduct" component={UploadProduct} options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ height: 70, aspectRatio: 1 }} className='w-25 flex items-center justify-center bg-[#FFF1F2] border-2 border-[#FF7622] rounded-full'>
                            < Icon name='plus' type='solid' color="#FF7622" size={25} />
                        </View>
                    ),
                    tabBarActiveTintColor: '#FF7622',
                    tabBarInactiveTintColor: '#000',
                }} />
                <Tab.Screen name="Notification" component={Notification} options={{
                    tabBarIcon: ({ focused }) => (
                        < Icon name='bell' type='solid' color={focused ? "#FF7622" : "gray"} size={25} />
                    ),
                    tabBarActiveTintColor: '#FF7622',
                    tabBarInactiveTintColor: '#000',
                }} />
                <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarIcon: ({ focused }) => (
                        < Icon name='user' type='solid' color={focused ? "#FF7622" : "gray"} size={25} />
                    ),
                    tabBarActiveTintColor: '#FF7622',
                    tabBarInactiveTintColor: '#000',
                }} />
            </Tab.Navigator>
        </DashBoardWraper>
    );
}

export default MainNavigation
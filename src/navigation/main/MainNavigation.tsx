import React, { useEffect, useRef } from 'react';
import DashBoard from '../../screens/main/DashBoard';
import DashBoardWraper from '../../layout/wraper/DashBoardWraper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../../screens/main/Notification';
import Profile from '../../screens/main/Profile';
import UploadProduct from '../../screens/main/UploadProduct';
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import Risehand from '../../screens/main/Risehand';
import {
    HomeIcon,
    MapPinIcon,
    PlusCircleIcon,
    BellIcon,
    UserIcon
} from 'react-native-heroicons/solid';
import {
    HomeIcon as HomeOutline,
    MapPinIcon as MapPinOutline,
    BellIcon as BellOutline,
    UserIcon as UserOutline
} from 'react-native-heroicons/outline';
import UploadTermPage from '../../screens/main/UploadTermPage';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
    return (
        <DashBoardWraper>
            <Tab.Navigator
                initialRouteName='DashBoard'
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarButton: (props) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            {...props}
                            android_ripple={{ color: 'transparent' }}
                        />
                    ),
                    tabBarStyle: {
                        backgroundColor: '#fff',
                        borderTopWidth: 0,
                        height: 85,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        paddingBottom: 25,
                        paddingTop: 15,
                        elevation: 15,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: -5 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        borderTopRightRadius: 25,
                        borderTopLeftRadius: 25,
                        borderColor: '#f1f1f1',
                    },
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="DashBoard"
                    component={DashBoard}
                    options={{
                        tabBarIcon: ({ focused, size }) => (
                            <TabIcon
                                focused={focused}
                                ActiveIcon={HomeIcon}
                                InactiveIcon={HomeOutline}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Risehand"
                    component={Risehand}
                    options={{
                        tabBarIcon: ({ focused, size }) => (
                            <TabIcon
                                focused={focused}
                                ActiveIcon={MapPinIcon}
                                InactiveIcon={MapPinOutline}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="UploadProduct"
                    component={UploadTermPage}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={styles.uploadButton}>
                                <AnimatedView focused={focused}>
                                    <PlusCircleIcon size={32} color="#fff" />
                                </AnimatedView>
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notification}
                    options={{
                        tabBarIcon: ({ focused, size }) => (
                            <TabIcon
                                focused={focused}
                                ActiveIcon={BellIcon}
                                InactiveIcon={BellOutline}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ focused, size }) => (
                            <TabIcon
                                focused={focused}
                                ActiveIcon={UserIcon}
                                InactiveIcon={UserOutline}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </DashBoardWraper>
    );
};

// Tab Icon Component with animation
const TabIcon = ({ focused, ActiveIcon, InactiveIcon, size = 26 }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (focused) {
            Animated.spring(scaleValue, {
                toValue: 1.15,
                friction: 3,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
        }
    }, [focused, scaleValue]);

    return (
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            {focused ? (
                <ActiveIcon size={size} color="#FF7622" />
            ) : (
                <InactiveIcon size={size} color="#64748B" />
            )}
        </Animated.View>
    );
};

// Special animation for the center button
const AnimatedView = ({ focused, children }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (focused) {
            Animated.parallel([
                Animated.spring(scaleValue, {
                    toValue: 1.1,
                    friction: 3,
                    useNativeDriver: true,
                }),
                Animated.spring(rotateValue, {
                    toValue: 1,
                    friction: 3,
                    useNativeDriver: true,
                })
            ]).start(() => {
                rotateValue.setValue(0);
            });
        } else {
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }).start();
        }
    }, [focused, scaleValue, rotateValue]);

    const rotateInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    return (
        <Animated.View style={[
            styles.animatedButton,
            {
                transform: [
                    { scale: scaleValue },
                    { rotate: rotateInterpolate }
                ]
            }
        ]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    uploadButton: {
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: '#FF7622',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF7622',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 25,
    },
    animatedButton: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default MainNavigation;
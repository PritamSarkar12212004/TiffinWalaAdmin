import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {
    HomeIcon,
    MapPinIcon,
    PlusIcon,
    BellIcon,
    UserIcon
} from 'react-native-heroicons/solid';
import {
    HomeIcon as HomeOutline,
    MapPinIcon as MapPinOutline,
    PlusIcon as PlusOutline,
    BellIcon as BellOutline,
    UserIcon as UserOutline
} from 'react-native-heroicons/outline';

const TabbarComponent = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                // Regular tab buttons
                let IconComponent;
                let LabelComponent;
                let label = '';

                switch (route.name) {
                    case 'DashBoard':
                        IconComponent = isFocused ? HomeIcon : HomeOutline;
                        label = 'Home';
                        break;
                    case 'Risehand':
                        IconComponent = isFocused ? MapPinIcon : MapPinOutline;
                        label = 'Track';
                        break;
                    case 'Notification':
                        IconComponent = isFocused ? BellIcon : BellOutline;
                        label = 'Alerts';
                        break;
                    case 'Profile':
                        IconComponent = isFocused ? UserIcon : UserOutline;
                        label = 'Profile';
                        break;
                    case 'UploadProduct':
                        IconComponent = isFocused ? PlusIcon : PlusOutline;
                        label = 'Post';
                        break;
                    default:
                        IconComponent = HomeOutline;
                        label = 'Home';
                }

                if (route.name === 'UploadProduct') {
                    return (
                        <TouchableOpacity
                            key={route.key}
                            activeOpacity={0.9}
                            style={[
                                styles.centerTabButton,
                                isFocused && styles.centerTabButtonActive
                            ]}
                            onPress={onPress}
                        >
                            <View style={[
                                styles.centerIconContainer,
                                isFocused && styles.centerIconContainerActive
                            ]}>
                                <IconComponent
                                    size={22}
                                    color={isFocused ? "#FFFFFF" : "#64748B"}
                                />
                            </View>
                            <Text style={[
                                styles.tabLabel,
                                isFocused && styles.tabLabelActive
                            ]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        key={route.key}
                        activeOpacity={0.8}
                        style={styles.tabButton}
                        onPress={onPress}
                    >
                        <View style={[
                            styles.iconContainer,
                            isFocused && styles.iconContainerActive
                        ]}>
                            <IconComponent
                                size={22}
                                color={isFocused ? "#FF7622" : "#64748B"}
                            />
                        </View>
                        <Text style={[
                            styles.tabLabel,
                            isFocused && styles.tabLabelActive
                        ]}>
                            {label}
                        </Text>
                        {isFocused && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 80,
        paddingHorizontal: 8,
        paddingBottom: 20,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F8FAFC',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 15,
        elevation: 10,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    centerTabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginHorizontal: 4,
    },
    iconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    iconContainerActive: {
        backgroundColor: '#FFF5F0',
    },
    centerIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        backgroundColor: '#F1F5F9',
    },
    centerIconContainerActive: {
        backgroundColor: '#FF7622',
    },
    centerTabButtonActive: {
        // Additional active states for center button if needed
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: '#64748B',
        marginTop: 2,
    },
    tabLabelActive: {
        color: '#FF7622',
        fontWeight: '600',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -2,
        width: 24,
        height: 3,
        borderRadius: 2,
        backgroundColor: '#FF7622',
    },
});

export default TabbarComponent;
import { View, ScrollView, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ShimmerSkeleton = ({ style, circle = false }: { style?: any; circle?: boolean }) => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => animation.stop();
    }, []);

    const translateX = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100],
    });

    return (
        <View style={[styles.shimmerContainer, circle && { borderRadius: 999 }, style]}>
            <Animated.View
                style={[
                    styles.shimmer,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            />
        </View>
    );
};

const NotificationSkeleton = () => {
    const skeletonItems = Array.from({ length: 8 });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <ShimmerSkeleton style={styles.headerTitle} />
                <ShimmerSkeleton style={styles.headerFilter} />
            </View>

            <View style={styles.listContainer}>
                {skeletonItems.map((_, index) => (
                    <View key={index} style={styles.notificationCard}>
                        {/* Avatar */}
                        <ShimmerSkeleton style={styles.avatar} circle />

                        {/* Content */}
                        <View style={styles.content}>
                            <View style={styles.contentHeader}>
                                <ShimmerSkeleton style={styles.notificationTitle} />
                                <ShimmerSkeleton style={styles.timeBadge} />
                            </View>
                            <ShimmerSkeleton style={styles.notificationMessage} />
                            <ShimmerSkeleton style={styles.notificationSubtext} />
                        </View>

                        {/* Action Indicator */}
                        <ShimmerSkeleton style={styles.actionIndicator} circle />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerTitle: {
        height: 24,
        borderRadius: 8,
        width: 120,
    },
    headerFilter: {
        height: 32,
        borderRadius: 16,
        width: 80,
    },
    listContainer: {
        padding: 16,
        gap: 12,
    },
    notificationCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatar: {
        width: 48,
        height: 48,
    },
    content: {
        flex: 1,
        gap: 8,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationTitle: {
        height: 16,
        borderRadius: 6,
        width: width * 0.4,
    },
    timeBadge: {
        height: 14,
        borderRadius: 7,
        width: 60,
    },
    notificationMessage: {
        height: 14,
        borderRadius: 6,
        width: width * 0.6,
    },
    notificationSubtext: {
        height: 12,
        borderRadius: 4,
        width: width * 0.3,
    },
    actionIndicator: {
        width: 8,
        height: 8,
        marginTop: 8,
    },
    shimmerContainer: {
        backgroundColor: '#E2E8F0',
        overflow: 'hidden',
        position: 'relative',
    },
    shimmer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default NotificationSkeleton;
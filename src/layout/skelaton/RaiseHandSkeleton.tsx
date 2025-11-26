import { View, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

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

const RaiseHandMapSkeleton = () => {
    const dummyFollowers = Array.from({ length: 6 });

    return (
        <View style={styles.container}>
            {/* Map Loading Area with Header */}
            <View style={styles.mapContainer}>
                <View style={styles.mapHeader}>
                    <ShimmerSkeleton style={styles.mapTitle} />
                    <View style={styles.mapActions}>
                        <ShimmerSkeleton style={styles.mapActionButton} circle />
                        <ShimmerSkeleton style={styles.mapActionButton} circle />
                    </View>
                </View>
                <ShimmerSkeleton style={styles.mapArea} />
            </View>

            {/* Bottom Sheet */}
            <View style={styles.bottomSheet}>
                <View style={styles.sheetHeader}>
                    <View style={styles.sheetTitleContainer}>
                        <ShimmerSkeleton style={styles.sheetTitle} />
                        <ShimmerSkeleton style={styles.sheetSubtitle} />
                    </View>
                    <ShimmerSkeleton style={styles.sheetFilter} />
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <ShimmerSkeleton style={styles.statValue} />
                        <ShimmerSkeleton style={styles.statLabel} />
                    </View>
                    <View style={styles.statItem}>
                        <ShimmerSkeleton style={styles.statValue} />
                        <ShimmerSkeleton style={styles.statLabel} />
                    </View>
                    <View style={styles.statItem}>
                        <ShimmerSkeleton style={styles.statValue} />
                        <ShimmerSkeleton style={styles.statLabel} />
                    </View>
                </View>

                <FlatList
                    data={dummyFollowers}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    renderItem={() => (
                        <View style={styles.followerCard}>
                            <ShimmerSkeleton style={styles.followerAvatar} circle />
                            <View style={styles.followerInfo}>
                                <ShimmerSkeleton style={styles.followerName} />
                                <ShimmerSkeleton style={styles.followerLocation} />
                                <View style={styles.followerTags}>
                                    <ShimmerSkeleton style={styles.tag} />
                                    <ShimmerSkeleton style={styles.tag} />
                                </View>
                            </View>
                            <ShimmerSkeleton style={styles.followerAction} />
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    mapContainer: {
        height: height * 0.5,
        backgroundColor: 'white',
        padding: 16,
    },
    mapHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    mapTitle: {
        height: 24,
        borderRadius: 8,
        width: 150,
    },
    mapActions: {
        flexDirection: 'row',
        gap: 8,
    },
    mapActionButton: {
        width: 40,
        height: 40,
    },
    mapArea: {
        flex: 1,
        borderRadius: 16,
    },
    bottomSheet: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -20,
        paddingHorizontal: 20,
        paddingTop: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    sheetTitleContainer: {
        flex: 1,
        gap: 4,
    },
    sheetTitle: {
        height: 24,
        borderRadius: 8,
        width: 140,
    },
    sheetSubtitle: {
        height: 16,
        borderRadius: 6,
        width: 200,
    },
    sheetFilter: {
        height: 32,
        borderRadius: 16,
        width: 90,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    statItem: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    statValue: {
        height: 20,
        borderRadius: 6,
        width: 40,
        marginBottom: 4,
    },
    statLabel: {
        height: 12,
        borderRadius: 4,
        width: 50,
    },
    listContent: {
        paddingBottom: 20,
    },
    followerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        marginBottom: 8,
    },
    followerAvatar: {
        width: 56,
        height: 56,
    },
    followerInfo: {
        flex: 1,
        gap: 6,
    },
    followerName: {
        height: 16,
        borderRadius: 6,
        width: 120,
    },
    followerLocation: {
        height: 14,
        borderRadius: 5,
        width: 80,
    },
    followerTags: {
        flexDirection: 'row',
        gap: 6,
    },
    tag: {
        height: 16,
        borderRadius: 8,
        width: 50,
    },
    followerAction: {
        width: 70,
        height: 32,
        borderRadius: 16,
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

export default RaiseHandMapSkeleton;
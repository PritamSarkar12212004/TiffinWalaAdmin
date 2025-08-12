import { View, StyleSheet, Dimensions, Animated, FlatList } from 'react-native';
import React from 'react';
import AnimationComp from '../../components/elements/AnimationComp';
import LoadingAnimation from '../../assets/Animation/Loading.json';

const { width, height } = Dimensions.get('window');

const SkeletonBox = ({ style }: { style?: any }) => (
    <Animated.View style={[styles.skeletonBox, style]} />
);

const RaiseHandMapSkeleton = () => {
    // Dummy array for list placeholders
    const dummyFollowers = Array.from({ length: 6 });

    return (
        <View style={styles.container}>
            {/* Map Loading Area */}
            <View style={styles.mapArea}>
                <AnimationComp path={LoadingAnimation} height={height * 0.4} width={width} />
            </View>

            {/* Bottom Sheet Follower List */}
            <View style={styles.bottomSheet}>
                <View style={styles.sheetHeader}>
                    <SkeletonBox style={styles.sheetTitle} />
                    <SkeletonBox style={styles.sheetIcon} />
                </View>

                <FlatList
                    data={dummyFollowers}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={() => (
                        <View style={styles.followerItem}>
                            <SkeletonBox style={styles.followerAvatar} />
                            <View style={{ flex: 1 }}>
                                <SkeletonBox style={styles.followerName} />
                                <SkeletonBox style={styles.followerLocation} />
                            </View>
                            <SkeletonBox style={styles.followerButton} />
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
        backgroundColor: 'white',
    },
    mapArea: {
        height: height * 0.55,
        width: '100%',
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheet: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sheetTitle: {
        width: 120,
        height: 18,
        borderRadius: 8,
        backgroundColor: '#E2E8F0',
    },
    sheetIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E2E8F0',
    },
    followerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    followerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E2E8F0',
    },
    followerName: {
        width: 120,
        height: 14,
        borderRadius: 8,
        backgroundColor: '#E2E8F0',
        marginBottom: 4,
    },
    followerLocation: {
        width: 80,
        height: 12,
        borderRadius: 8,
        backgroundColor: '#E2E8F0',
    },
    followerButton: {
        width: 60,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#E2E8F0',
    },
    skeletonBox: {
        backgroundColor: '#E2E8F0',
        overflow: 'hidden',
    },
});

export default RaiseHandMapSkeleton;

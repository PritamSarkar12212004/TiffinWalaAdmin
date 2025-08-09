import { View, ScrollView, StyleSheet, Animated } from 'react-native';
import React from 'react';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SkeletonBox = ({ style }: { style?: any }) => (
    <Animated.View style={[styles.skeletonBox, style]} />
);

const NotificationSkeleton = () => {
    const skeletonItems = Array.from({ length: 15 });

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.listContainer}>
                {skeletonItems.map((_, index) => (
                    <View key={index} style={styles.itemContainer}>
                        {/* Left Avatar */}
                        <SkeletonBox style={styles.avatarSkeleton} />

                        {/* Text Content */}
                        <View style={styles.textContainer}>
                            <SkeletonBox style={styles.nameSkeleton} />
                            <SkeletonBox style={styles.actionSkeleton} />
                            <SkeletonBox style={styles.dateSkeleton} />
                        </View>

                        {/* Right Image */}
                        <SkeletonBox style={styles.rightImageSkeleton} />
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    listContainer: {
        width: '100%',
        paddingHorizontal: 16,
        gap: 18,
        paddingTop: 18,
        paddingBottom: 32,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        shadowColor: '#FF7622',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    avatarSkeleton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 14,
    },
    textContainer: {
        flex: 1,
    },
    nameSkeleton: {
        width: width * 0.4,
        height: 17,
        borderRadius: 8,
        marginBottom: 6,
    },
    actionSkeleton: {
        width: width * 0.5,
        height: 15,
        borderRadius: 8,
        marginBottom: 6,
    },
    dateSkeleton: {
        width: 60,
        height: 13,
        borderRadius: 8,
    },
    rightImageSkeleton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        marginLeft: 14,
    },
    skeletonBox: {
        backgroundColor: '#E2E8F0',
        overflow: 'hidden',
    },
});

export default NotificationSkeleton;

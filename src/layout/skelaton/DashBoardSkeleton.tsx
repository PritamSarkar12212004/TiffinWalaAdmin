import { View, ScrollView, StyleSheet, Dimensions, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

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

const DashboardSkeleton = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header Skeleton */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <ShimmerSkeleton style={styles.headerTitleSkeleton} />
            <ShimmerSkeleton style={styles.headerSubtitleSkeleton} />
          </View>
          <ShimmerSkeleton style={styles.headerIconSkeleton} circle />
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <ShimmerSkeleton style={styles.metricIcon} circle />
            <View style={styles.metricContent}>
              <ShimmerSkeleton style={styles.metricValue} />
              <ShimmerSkeleton style={styles.metricLabel} />
            </View>
          </View>
          <View style={styles.metricCard}>
            <ShimmerSkeleton style={styles.metricIcon} circle />
            <View style={styles.metricContent}>
              <ShimmerSkeleton style={styles.metricValue} />
              <ShimmerSkeleton style={styles.metricLabel} />
            </View>
          </View>
          <View style={styles.metricCard}>
            <ShimmerSkeleton style={styles.metricIcon} circle />
            <View style={styles.metricContent}>
              <ShimmerSkeleton style={styles.metricValue} />
              <ShimmerSkeleton style={styles.metricLabel} />
            </View>
          </View>
          <View style={styles.metricCard}>
            <ShimmerSkeleton style={styles.metricIcon} circle />
            <View style={styles.metricContent}>
              <ShimmerSkeleton style={styles.metricValue} />
              <ShimmerSkeleton style={styles.metricLabel} />
            </View>
          </View>
        </View>

        {/* Charts Section */}
        <View style={styles.section}>
          <ShimmerSkeleton style={styles.sectionTitle} />
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <ShimmerSkeleton style={styles.chartTitle} />
              <ShimmerSkeleton style={styles.chartFilter} />
            </View>
            <ShimmerSkeleton style={styles.chartArea} />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShimmerSkeleton style={styles.sectionTitle} />
            <ShimmerSkeleton style={styles.seeAllButton} />
          </View>
          <View style={styles.activityCard}>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.activityItem}>
                <ShimmerSkeleton style={styles.activityAvatar} circle />
                <View style={styles.activityContent}>
                  <ShimmerSkeleton style={styles.activityText} />
                  <ShimmerSkeleton style={styles.activitySubtext} />
                </View>
                <ShimmerSkeleton style={styles.activityTime} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerContent: {
    flex: 1,
    gap: 8,
  },
  headerTitleSkeleton: {
    width: 180,
    height: 32,
    borderRadius: 8,
  },
  headerSubtitleSkeleton: {
    width: 220,
    height: 16,
    borderRadius: 6,
  },
  headerIconSkeleton: {
    width: 48,
    height: 48,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  metricCard: {
    width: (width - 52) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricIcon: {
    width: 40,
    height: 40,
  },
  metricContent: {
    flex: 1,
    gap: 6,
  },
  metricValue: {
    height: 20,
    borderRadius: 6,
  },
  metricLabel: {
    height: 14,
    borderRadius: 4,
    width: '70%',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    height: 20,
    borderRadius: 6,
    width: 140,
  },
  seeAllButton: {
    height: 16,
    borderRadius: 6,
    width: 60,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    height: 18,
    borderRadius: 6,
    width: 120,
  },
  chartFilter: {
    height: 28,
    borderRadius: 14,
    width: 80,
  },
  chartArea: {
    height: 200,
    borderRadius: 12,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  activityAvatar: {
    width: 44,
    height: 44,
  },
  activityContent: {
    flex: 1,
    gap: 6,
  },
  activityText: {
    height: 16,
    borderRadius: 6,
  },
  activitySubtext: {
    height: 12,
    borderRadius: 4,
    width: '60%',
  },
  activityTime: {
    height: 12,
    borderRadius: 4,
    width: 50,
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

export default DashboardSkeleton;
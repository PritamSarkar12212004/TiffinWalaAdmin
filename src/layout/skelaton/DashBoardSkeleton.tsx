import { View, ScrollView, StyleSheet, Dimensions, Animated } from 'react-native';
import React from 'react';
import AnimationComp from '../../components/elements/AnimationComp';
import LoadingAnimation from '../../assets/Animation/Loading.json';

const { width } = Dimensions.get('window');

const SkeletonBox = ({ style }: { style?: any }) => (
  <Animated.View style={[styles.skeletonBox, style]} />
);

const DashboardSkeleton = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header Skeleton */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <SkeletonBox style={styles.headerTitleSkeleton} />
            <SkeletonBox style={styles.headerSubtitleSkeleton} />
          </View>
          <SkeletonBox style={styles.headerIconSkeleton} />
        </View>

        {/* Top Metrics Row Skeleton */}
        <View style={styles.metricsRow}>
          <SkeletonBox style={styles.metricCardSkeleton} />
          <SkeletonBox style={styles.metricCardSkeleton} />
        </View>
        {/* Second Metrics Row Skeleton */}
        <View style={styles.metricsRow}>
          <SkeletonBox style={styles.metricCardSkeleton} />
          <SkeletonBox style={styles.metricCardSkeleton} />
        </View>

        {/* Charts Section Skeleton */}
        <View style={styles.chartsSection}>
          <View style={styles.chartCardSkeleton}>
            <View style={styles.chartHeaderSkeleton}>
              <SkeletonBox style={styles.chartIconSkeleton} />
              <SkeletonBox style={styles.chartTitleSkeleton} />
            </View>
            <View style={styles.chartSkeletonContent}>
              <AnimationComp path={LoadingAnimation} height={80} width={width - 120} />
            </View>
          </View>
          <View style={styles.chartCardSkeleton}>
            <View style={styles.chartHeaderSkeleton}>
              <SkeletonBox style={styles.chartIconSkeleton} />
              <SkeletonBox style={styles.chartTitleSkeleton} />
            </View>
            <View style={styles.chartSkeletonContent}>
              <AnimationComp path={LoadingAnimation} height={80} width={width - 120} />
            </View>
          </View>
          <View style={styles.chartCardSkeleton}>
            <View style={styles.chartHeaderSkeleton}>
              <SkeletonBox style={styles.chartIconSkeleton} />
              <SkeletonBox style={styles.chartTitleSkeleton} />
            </View>
            <View style={styles.chartSkeletonContent}>
              <AnimationComp path={LoadingAnimation} height={80} width={width - 120} />
            </View>
          </View>
        </View>

        {/* Recent Activity Skeleton */}
        <View style={styles.recentActivityCardSkeleton}>
          <View style={styles.cardHeaderSkeleton}>
            <SkeletonBox style={styles.cardTitleSkeleton} />
            <SkeletonBox style={styles.seeAllSkeleton} />
          </View>
          <View style={styles.activityListSkeleton}>
            {[1, 2, 3, 4].map((_, idx) => (
              <View key={idx} style={styles.activityItemSkeleton}>
                <SkeletonBox style={styles.activityIconSkeleton} />
                <View style={styles.activityContentSkeleton}>
                  <SkeletonBox style={styles.activityTextSkeleton} />
                  <SkeletonBox style={styles.activityTimeSkeleton} />
                </View>
                <SkeletonBox style={styles.activityIndicatorSkeleton} />
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
    backgroundColor: 'white',
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
  },
  headerTitleSkeleton: {
    width: 180,
    height: 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerSubtitleSkeleton: {
    width: 220,
    height: 18,
    borderRadius: 8,
  },
  headerIconSkeleton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  metricCardSkeleton: {
    flex: 1,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  chartsSection: {
    gap: 20,
    marginBottom: 32,
  },
  chartCardSkeleton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  chartHeaderSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  chartIconSkeleton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
  chartTitleSkeleton: {
    width: 100,
    height: 18,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  chartSkeletonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  recentActivityCardSkeleton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitleSkeleton: {
    width: 120,
    height: 20,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  seeAllSkeleton: {
    width: 60,
    height: 18,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  activityListSkeleton: {
    gap: 16,
  },
  activityItemSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
  },
  activityIconSkeleton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
  },
  activityContentSkeleton: {
    flex: 1,
  },
  activityTextSkeleton: {
    width: 120,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
    marginBottom: 4,
  },
  activityTimeSkeleton: {
    width: 60,
    height: 12,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  activityIndicatorSkeleton: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
  },
  skeletonBox: {
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
});

export default DashboardSkeleton; 
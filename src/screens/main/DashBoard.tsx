import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from '../../MainLogo/icon/Icon';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import DashboardSkeleton from '../../layout/skelaton/DashBoardSkeleton';
import { ChartCardProps, MetricCardProps } from '../../interface/dashboard/MetricCardProps';
import useMainDataRicive from '../../hooks/api/main/DataRiciver/useMainDataRicive';
import { userContext } from '../../util/context/ContextProvider';
import DashBoardNoProduct from '../../components/noProduct/DashBoardNoProduct';
import { useNavigation } from '@react-navigation/native';
import { barData, lineData, monthlyOrdersData } from '../../demo/data/DasboardData';
import setStorage from '../../functions/token/setStorage';
import Token from '../../constant/tokens/Token';

const { width } = Dimensions.get('window');
const DashBoard = () => {
  const navigation = useNavigation()
  const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, gradient = false, subtitle }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.metricCard}>
      <View style={[styles.metricGradient, { backgroundColor: gradient ? color : '#FFFFFF' }]}>
        <View style={styles.metricContent}>
          <View style={[styles.iconContainer, { backgroundColor: gradient ? 'rgba(255,255,255,0.2)' : color + '15' }]}>
            <Icon name={icon} size={20} type="solid" color={gradient ? 'white' : color} />
          </View>
          <Text style={[styles.metricValue, { color: gradient ? 'white' : color }]}>{value}</Text>
          <Text style={[styles.metricTitle, { color: gradient ? 'rgba(255,255,255,0.9)' : '#64748B' }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.metricSubtitle, { color: gradient ? 'rgba(255,255,255,0.7)' : '#94A3B8' }]}>{subtitle}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const ChartCard: React.FC<ChartCardProps> = ({ title, children, icon, iconColor = '#6366F1' }) => (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <View style={styles.chartTitleContainer}>
          <View style={[styles.chartIconContainer, { backgroundColor: iconColor + '15' }]}>
            <Icon name={icon} size={18} type="solid" color={iconColor} />
          </View>
          <Text style={styles.chartTitle}>{title}</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>View All</Text>
          <Icon name="chevron-right" size={14} type="solid" color="#6366F1" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );


  const { riciveData } = useMainDataRicive();
  const { adminLocalData, setAdminDatabase, adminProductCount, setAdminProductCount, loading, setloading } = userContext();
  useEffect(() => {
    riciveData(adminLocalData.User_Phone_Number, setAdminDatabase, setAdminProductCount).then(() => {
      setloading(false);
    });
  }, [loading]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <Text style={styles.headerSubtitle}>Welcome back! Here's your business overview</Text>
            </View>
            <View style={styles.headerIcon}>
              <Icon name="chart-line" size={24} type="solid" color="#6366F1" />
            </View>
          </View>
          {
            adminProductCount ? <>
              {/* Top Metrics Row */}
              <View style={styles.metricsRow}>
                <MetricCard title="Total Views" value="5483" icon="street-view" color="#6366F1" gradient />
                <MetricCard title="Total Like" value="986" icon="heart" color="#10B981" gradient />
              </View>

              {/* Second Metrics Row */}
              <View style={styles.metricsRow}>
                <MetricCard title="Followers" value="400" icon="users" color="#3B82F6" />
                <MetricCard title="Products" value="2" icon="box" color="#8B5CF6" />
              </View>

              {/* Charts Section */}
              <View style={styles.chartsSection}>
                <ChartCard title="Revenue Trends" icon="trending-up" iconColor="#10B981">
                  <LineChart
                    data={lineData}
                    thickness={3}
                    color="#10B981"
                    hideDataPoints={false}
                    areaChart
                    startFillColor="#10B98115"
                    endFillColor="#10B98105"
                    yAxisColor="transparent"
                    xAxisColor="transparent"
                    yAxisTextStyle={{ color: '#64748B', fontSize: 10 }}
                    xAxisLabelTextStyle={{ color: '#64748B', fontSize: 10 }}
                    curved
                    maxValue={5000}
                    noOfSections={4}
                    yAxisLabelPrefix="₹"
                    height={160}
                  />
                </ChartCard>

                <ChartCard title="Weekly Traffic" icon="chart-bar" iconColor="#6366F1">
                  <BarChart
                    barWidth={18}
                    noOfSections={4}
                    barBorderRadius={6}
                    frontColor="#6366F1"
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    yAxisTextStyle={{ color: '#64748B', fontSize: 10 }}
                    yAxisColor="transparent"
                    xAxisColor="transparent"
                    height={160}
                  />
                </ChartCard>

                <ChartCard title="Monthly Traffic" icon="calendar" iconColor="#8B5CF6">
                  <BarChart
                    barWidth={14}
                    noOfSections={4}
                    barBorderRadius={6}
                    frontColor="#8B5CF6"
                    data={monthlyOrdersData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    yAxisTextStyle={{ color: '#64748B', fontSize: 10 }}
                    yAxisColor="transparent"
                    xAxisColor="transparent"
                    height={160}
                  />
                </ChartCard>
              </View>

              {/* Recent Activity */}
              <View style={styles.recentActivityCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Recent Activity</Text>
                  <TouchableOpacity activeOpacity={0.7} style={styles.seeAllButton}>
                    <Text style={styles.seeAllText}>View All</Text>
                    <Icon name="chevron-right" size={14} type="solid" color="#6366F1" />
                  </TouchableOpacity>
                </View>
                <View style={styles.activityList}>
                  {[
                    { icon: 'shopping-cart', text: 'New order #1234 received', time: '2 min ago', color: '#10B981' },
                    { icon: 'user-plus', text: 'New user registered', time: '5 min ago', color: '#3B82F6' },
                    { icon: 'star', text: '5-star review received', time: '10 min ago', color: '#F59E0B' },
                    { icon: 'exclamation-triangle', text: 'Low stock alert', time: '15 min ago', color: '#EF4444' },
                  ].map((activity, index) => (
                    <View key={index} style={styles.activityItem}>
                      <View style={[styles.activityIcon, { backgroundColor: activity.color + '15' }]}>
                        <Icon name={activity.icon} size={16} type="solid" color={activity.color} />
                      </View>
                      <View style={styles.activityContent}>
                        <Text style={styles.activityText}>{activity.text}</Text>
                        <Text style={styles.activityTime}>{activity.time}</Text>
                      </View>
                      <View style={styles.activityIndicator} />
                    </View>
                  ))}
                </View>
              </View>
            </> : <View className='flex-1 flex items-center justify-center'><DashBoardNoProduct navigation={navigation} /></View>
          }
        </View>
      )}
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
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 22,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366F115',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  metricGradient: {
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
  },
  metricContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  chartsSection: {
    gap: 20,
    marginBottom: 32,
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chartIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#6366F108',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  pieChartContainer: {
    alignItems: 'center',
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  centerLabelValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    flex: 1,
  },
  legendValue: {
    fontSize: 13,
    color: '#1E293B',
    fontWeight: '600',
  },
  quickActionsCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  actionButton: {
    width: (width - 88) / 2,
    height: 90,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  recentActivityCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748B',
  },
  activityIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },

});

export default DashBoard;

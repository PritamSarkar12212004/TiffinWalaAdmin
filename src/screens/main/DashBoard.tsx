import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import notifee, { EventType } from '@notifee/react-native';

import Icon from '../../MainLogo/icon/Icon';
import { BarChart } from 'react-native-gifted-charts';
import DashboardSkeleton from '../../layout/skelaton/DashBoardSkeleton';
import messaging from '@react-native-firebase/messaging'
import {
  ChartCardProps,
  MetricCardProps,
} from '../../interface/dashboard/MetricCardProps';
import useMainDataRicive from '../../hooks/api/main/DataRiciver/useMainDataRicive';
import { userContext } from '../../util/context/ContextProvider';
import DashBoardNoProduct from '../../components/noProduct/DashBoardNoProduct';
import { useNavigation } from '@react-navigation/native';
import getStorage from '../../functions/token/getStorage';
import Token from '../../constant/tokens/Token';
import onScreenNotiFyFunc from '../../functions/notification/manager/onScreenNotiFyFunc';
import useTokenGet from '../../hooks/api/notification/Noti/useGetToken';
import requestForNotification from '../../functions/notification/request/requestForNotification';

const { width } = Dimensions.get('window');

const DashBoard = () => {
  const navigation = useNavigation();
  const { riciveData } = useMainDataRicive();
  const {
    adminLocalData,
    adminDatabase,
    setAdminDatabase,
    adminProductCount,
    setAdminLocalData,
    setAdminProductCount,
    loading,
    setloading,
    productData,
    setProductData,
  } = userContext();

  const fetchData = async () => {
    setloading(true);
    try {
      let userInfo = adminLocalData;
      if (!userInfo?.User_Phone_Number) {
        userInfo = await getStorage(Token.DataToken.UserInformation);
        setAdminLocalData(userInfo);
      }
      await riciveData(
        userInfo.User_Phone_Number,
        setAdminDatabase,
        setAdminProductCount
      );
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setloading(false);
      setRefreshing(false);
    }
  };
  const { tokenSet } = useTokenGet()
  const [updateToken, setUpdateToken] = useState<any>(null)
  const [token, settoken] = useState<any>(null)
  useEffect(() => {
    const tokenRefresh = messaging().onTokenRefresh((newToken) => {
      setUpdateToken(newToken)
    })
    return () => {
      tokenRefresh()
    }
  }, []);
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const { type } = remoteMessage.data || {};
      if (type === 'open') {
        onScreenNotiFyFunc(remoteMessage);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        const screen = detail.notification?.data?.navigate || 'Notification';
        navigation.navigate(screen as never);
      }
    });
    return unsubscribe;
  }, [navigation])
  useEffect(() => {
    if (adminDatabase && token) {
      tokenSet(updateToken ?? token, adminDatabase.adminMainData._id)
    }
  }, [adminDatabase, token, updateToken])

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  useEffect(() => {
    requestForNotification(settoken)
    fetchData();
    return () => {
      setProductData(null);
      setAdminDatabase(null);
      setAdminProductCount(null);
    };
  }, []);

  const getMonthlyTrafficData = () => {
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyDataMap = new Map();
    monthsOfYear.forEach((month, index) => {
      monthlyDataMap.set(index, { value: 0, label: month });
    });
    if (adminDatabase?.monthlyTrafic) {
      adminDatabase.monthlyTrafic.forEach((item: any) => {
        if (item.monthStart && item.count !== undefined) {
          try {
            const date = new Date(item.monthStart);
            if (!isNaN(date.getTime())) {
              const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb, ..., 7 = Aug, 8 = Sep
              const currentValue = monthlyDataMap.get(monthIndex)?.value || 0;
              monthlyDataMap.set(monthIndex, {
                value: currentValue + item.count,
                label: monthsOfYear[monthIndex]
              });
            }
          } catch (error) {
            console.log('Error parsing date:', error);
          }
        }
      });
    }
    const monthlyData = monthsOfYear.map((month, index) => {
      const data = monthlyDataMap.get(index);
      return {
        value: data?.value || 0,
        label: month,
        frontColor: data?.value > 0 ? '#8B5CF6' : '#E5E7EB',
        spacing: 4,
      };
    });
    return monthlyData;
  };

  const monthlyTrafficData = getMonthlyTrafficData();
  const currentMonthTotal = monthlyTrafficData.reduce((sum, item) => sum + item.value, 0);
  const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    icon,
    color,
    gradient = false,
    subtitle,
  }) => (
    <View style={styles.metricCard}>
      <View
        style={[
          styles.metricGradient,
          { backgroundColor: gradient ? color : '#FFFFFF' },
        ]}>
        <View style={styles.metricContent}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: gradient ? 'rgba(255,255,255,0.2)' : color + '15' },
            ]}>
            <Icon
              name={icon}
              size={20}
              type="solid"
              color={gradient ? 'white' : color}
            />
          </View>
          <Text
            style={[
              styles.metricValue,
              { color: gradient ? 'white' : color },
            ]}>
            {value ?? '0'}
          </Text>
          <Text
            style={[
              styles.metricTitle,
              { color: gradient ? 'rgba(255,255,255,0.9)' : '#64748B' },
            ]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.metricSubtitle,
                { color: gradient ? 'rgba(255,255,255,0.7)' : '#94A3B8' },
              ]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const ChartCard: React.FC<ChartCardProps> = ({
    title,
    children,
    icon,
    iconColor = '#6366F1',
  }) => (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <View style={styles.chartTitleContainer}>
          <View
            style={[styles.chartIconContainer, { backgroundColor: iconColor + '15' }]}>
            <Icon name={icon} size={18} type="solid" color={iconColor} />
          </View>
          <Text style={styles.chartTitle}>{title}</Text>
        </View>
      </View>
      {children}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <Text style={styles.headerSubtitle}>
                Welcome back! Here's your business overview
              </Text>
            </View>
            <View style={styles.headerIcon}>
              <Icon name="chart-line" size={24} type="solid" color="#6366F1" />
            </View>
          </View>

          {adminProductCount?.length > 0 ? (
            <>
              <View style={styles.metricsRow}>
                <MetricCard
                  title="Total Views"
                  value={adminDatabase?.AdminTotoalViwers}
                  icon="street-view"
                  color="#6366F1"
                  gradient
                />
                <MetricCard
                  title="Total Like"
                  value={adminDatabase?.AdminTotoalLikes}
                  icon="heart"
                  color="#10B981"
                  gradient
                />
              </View>

              <View className='w-full flex  flex-row items-center justify-between mb-5'>
                <TouchableOpacity className='w-[48%]' activeOpacity={1} onPress={() => navigation.navigate({
                  name: 'page',
                  params: {
                    screen: 'FollowerPage',
                  },
                } as never)}>
                  <MetricCard
                    title="Followers"
                    value={adminDatabase?.followerList?.length ?? 0}
                    icon="users"
                    color="#3B82F6"
                  />
                </TouchableOpacity>
                <TouchableOpacity className='w-[48%]' activeOpacity={1} onPress={() => navigation.navigate({
                  name: 'page',
                  params: {
                    screen: 'ViewProductDetiles',
                    params: { data: productData || [] },
                  },
                } as never)}>

                  <MetricCard
                    title="Products"
                    value={productData?.length ?? 0}
                    icon="box"
                    color="#8B5CF6"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.chartsSection}>
                <ChartCard title="Monthly Traffic" icon="calendar" iconColor="#8B5CF6">
                  <View style={styles.chartContainer}>
                    <BarChart
                      barWidth={14}
                      noOfSections={4}
                      barBorderRadius={4}
                      data={monthlyTrafficData}
                      yAxisThickness={0}
                      xAxisThickness={0}
                      yAxisTextStyle={{ color: '#64748B', fontSize: 9 }}
                      yAxisColor="transparent"
                      xAxisColor="transparent"
                      height={160}
                      xAxisLabelTextStyle={{
                        fontSize: 9,
                        color: '#64748B',
                        textAlign: 'center'
                      }}
                      showValuesAsTopLabel
                      topLabelTextStyle={{
                        fontSize: 9,
                        color: '#8B5CF6',
                        fontWeight: '600'
                      }}
                      maxValue={Math.max(...monthlyTrafficData.map(item => item.value)) + 10 || 50}
                    />
                    <View style={styles.totalContainer}>
                      <Text style={styles.totalText}>
                        Total: {currentMonthTotal} views
                      </Text>
                    </View>
                  </View>
                </ChartCard>
                <View style={{ marginTop: 30 }}>
                  <View className="w-full flex flex-row items-center justify-between">
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '800',
                        color: '#1E293B',
                        marginBottom: 16,
                      }}>
                      Your Tiffins
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate({
                          name: 'page',
                          params: {
                            screen: 'ViewProductDetiles',
                            params: { data: productData || [] },
                          },
                        } as never)
                      }
                      className="flex flex-row items-center justify-center gap-2">
                      <Text style={styles.seeAllText}>View All</Text>
                      <Icon name="chevron-right" size={14} type="solid" color="#6366F1" />
                    </TouchableOpacity>
                  </View>

                  {productData && productData.slice(0, 2).map((item: any) => (
                    <TouchableOpacity
                      key={item?._id}
                      activeOpacity={0.9}
                      onPress={() =>
                        navigation.navigate({
                          name: 'page',
                          params: {
                            screen: 'ViewProductAnalazeDetiles',
                            params: { data: item },
                          },
                        } as never)
                      }
                      style={{
                        marginBottom: 20,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        padding: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.08,
                        shadowRadius: 12,
                        elevation: 6,
                      }}>
                      {/* Image */}
                      <View
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          marginBottom: 12,
                        }}>
                        <Image
                          source={{ uri: item?.postCoverImage?.[0] }}
                          style={{ width: '100%' }}
                          className="h-72"
                          resizeMode="cover"
                        />
                      </View>

                      <Text
                        style={{ fontSize: 18, fontWeight: '700', color: '#1E293B' }}>
                        {item?.postTitle}
                      </Text>
                      <Text
                        style={{ fontSize: 14, color: '#64748B', marginVertical: 6 }}>
                        {item?.postDescription?.slice(0, 80)}...
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 8,
                        }}>
                        <Text style={{ color: '#10B981', fontWeight: '700' }}>
                          ₹{item?.postPrice}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="heart" size={14} type="solid" color="#EF4444" />
                            <Text style={{ marginLeft: 4, fontSize: 12 }}>
                              {item?.productLikes?.length ?? 0}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="eye" size={14} type="solid" color="#6366F1" />
                            <Text style={{ marginLeft: 4, fontSize: 12 }}>
                              {item?.postTotalViews}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: 12,
                          color: '#94A3B8',
                          marginTop: 4,
                        }}>
                        📍{item?.postLocation}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          ) : (
            <View className="flex-1 flex items-center justify-center">
              <DashBoardNoProduct navigation={navigation} />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginTop: 8,
  },
  totalContainer: {
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 10,
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
});

export default DashBoard;
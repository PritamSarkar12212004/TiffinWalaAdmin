import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Animated
} from 'react-native';
import { userContext } from '../../util/context/ContextProvider';
import NoNotificaProduct from '../../components/noProduct/NoNotificaProduct';
import useNotiFetch from '../../hooks/api/notification/useNotiFetch';
import NotificationSkeleton from '../../layout/skelaton/NotificationSkeleton';
import useDeleteNoti from '../../hooks/api/notification/useDeleteNoti';

const Notification = () => {
  const { adminProductCount, adminDatabase } = userContext();
  const [loading, setLoading] = useState<null | boolean>(null);
  const [data, setData] = useState<any[]>([]);
  const { fetchNoti } = useNotiFetch();
  const [refreshing, setRefreshing] = useState(false);
  const { deleteNoti } = useDeleteNoti();
  const [fadeAnim] = useState(new Animated.Value(0));

  const dataFetch = () => {
    fetchNoti({
      id: adminDatabase.adminMainData._id,
      setdata: (notifications: any[]) => {
        setData(notifications);
        // Animate when data loads
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      },
      setLoading,
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dataFetch();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (adminDatabase) {
      dataFetch();
    }
  }, []);

  // Delete notification handler with animation
  const handleDelete = (id: string) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      deleteNoti(id);
      setData(prevData => prevData.filter(item => item._id !== id));
      // Reset animation for remaining items
      fadeAnim.setValue(1);
    });
  };

  const NotificationCard = ({ item, index }: any) => (
   
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: item.senderImg }}
            style={styles.senderImage}
          // defaultSource={require('../../assets/default-avatar.png')} // Add a default avatar
          />
          <View style={styles.onlineIndicator} />
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          </View>

          <View style={styles.footerContainer}>
            <View style={styles.timestampContainer}>
              <Text style={styles.timestamp}>
                {new Date(item.date).toLocaleString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Text>
              <View style={styles.dotSeparator} />
              <Text style={styles.timeAgo}>
                {getTimeAgo(item.date)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightSection}>
          {item.contentImg && (
            <Image
              source={{ uri: item.contentImg }}
              style={styles.contentImage}
            />
          )}

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(item._id)}
          >
            <Text style={styles.deleteIcon}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
  );

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <View style={styles.container}>
      {adminProductCount?.length > 0 ?
        !loading ?
          data.length > 0 ? (
            <ScrollView
              style={styles.scrollView}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#FF7622']}
                  tintColor={'#FF7622'}
                  progressBackgroundColor="#ffffff"
                />
              }
              showsVerticalScrollIndicator={false}
            >
       

              <View style={styles.listContainer}>
                {data.map((item, index) => (
                  <NotificationCard key={item._id} item={item} index={index} />
                ))}
              </View>
            </ScrollView>
          ) : (
            // Modern Empty State
            <View style={styles.emptyState}>
              <View style={styles.emptyIllustration}>
                <Text style={styles.emptyEmoji}>🔔</Text>
                <View style={styles.emptyPulse} />
              </View>
              <Text style={styles.emptyTitle}>No Notifications Yet</Text>
              <Text style={styles.emptyDescription}>
                You're all caught up! When you receive new notifications,{'\n'}
                they'll appear here.
              </Text>
              <TouchableOpacity
                style={styles.refreshButton}
                onPress={dataFetch}
              >
                <Text style={styles.refreshButtonText}>Check for Updates</Text>
              </TouchableOpacity>
            </View>
          )
          : (
            <NotificationSkeleton />
          )
        : (
          <NoNotificaProduct />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  senderImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: 'white',
  },
  contentContainer: {
    flex: 1,
    marginRight: 12,
  },
  textContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#cbd5e1',
    marginHorizontal: 6,
  },
  timeAgo: {
    fontSize: 12,
    color: '#FF7622',
    fontWeight: '600',
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 8,
  },
  contentImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  deleteIcon: {
    color: '#dc2626',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -1,
  },
  // Modern Empty State Styles
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: 'white',
  },
  emptyIllustration: {
    position: 'relative',
    marginBottom: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    zIndex: 2,
    position: 'relative',
  },
  emptyPulse: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FF762220',
    zIndex: 1,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    letterSpacing: -0.2,
  },
  refreshButton: {
    backgroundColor: '#FF7622',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#FF7622',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.3,
  },
});

export default Notification;
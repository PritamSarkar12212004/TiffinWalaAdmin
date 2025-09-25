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

  const dataFetch = () => {
    fetchNoti({
      id: adminDatabase.adminMainData._id,
      setdata: (notifications: any[]) => {
        setData(notifications);
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

  // Delete notification handler
  const handleDelete = (id: string) => {
    deleteNoti(id);
    setData(prevData => prevData.filter(item => item._id !== id));
  };

  const NotificationCard = ({ item }) => (
    <View style={styles.notificationCard}>
      <Image
        source={{ uri: item.senderImg }}
        style={styles.senderImage}
      />

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </View>

        <Text style={styles.timestamp}>
          {new Date(item.date).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </Text>
      </View>

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
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {adminProductCount > 0 ?
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
                />
              }
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.listContainer}>
                {data.map((item) => (
                  <NotificationCard key={item._id} item={item} />
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No notifications yet</Text>
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
  listContainer: {
    padding: 12,
    paddingBottom: 20,
  },
  notificationCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 12,
    position: 'relative',
  },
  senderImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  textContainer: {
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 12,
    color: '#FF7622',
    fontWeight: '500',
  },
  contentImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginLeft: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ff3b30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default Notification;
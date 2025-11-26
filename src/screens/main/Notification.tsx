import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { userContext } from '../../util/context/ContextProvider';
import NoNotificaProduct from '../../components/noProduct/NoNotificaProduct';
import useNotiFetch from '../../hooks/api/notification/useNotiFetch';
import NotificationSkeleton from '../../layout/skelaton/NotificationSkeleton';
import useDeleteNoti from '../../hooks/api/notification/useDeleteNoti';
import Icon from '../../MainLogo/icon/Icon';

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

  const handleDelete = (id: string) => {
    deleteNoti(id);
    setData(prevData => prevData.filter(item => item._id !== id));
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getNotificationIcon = (item: any) => {
    const title = item.title?.toLowerCase() || '';
    const description = item.description?.toLowerCase() || '';

    if (title.includes('order') || description.includes('order')) {
      return { name: 'shopping-bag', color: '#8b5cf6' };
    }
    if (title.includes('follow') || description.includes('follow')) {
      return { name: 'user-plus', color: '#06b6d4' };
    }
    if (title.includes('message') || description.includes('message')) {
      return { name: 'message', color: '#10b981' };
    }
    if (title.includes('like') || description.includes('like')) {
      return { name: 'heart', color: '#ef4444' };
    }
    if (title.includes('comment') || description.includes('comment')) {
      return { name: 'comment', color: '#f59e0b' };
    }

    return { name: 'bell', color: '#6366f1' };
  };

  const NotificationCard = ({ item }: any) => {
    const icon = getNotificationIcon(item);

    return (
      <View className="bg-white rounded-2xl mb-3 p-2 shadow-sm border border-gray-100 relative overflow-hidden">
        <View className="flex-row items-start ">
          <View
            className="w-11 h-11 rounded-xl justify-center items-center mr-3 mt-0.5"
            style={{ backgroundColor: `${icon.color}15` }}
          >
            <Icon
              type={'solid'}
              name={icon.name}
              size={20}
              color={icon.color}
            />
          </View>

          {/* Main Content */}
          <View className="flex-1 mr-3">
            <Text className="text-base font-bold text-gray-900 mb-1.5 leading-5" numberOfLines={2}>
              {item.title}
            </Text>
            <Text className="text-sm text-gray-600 leading-5 mb-3" numberOfLines={3}>
              {item.description}
            </Text>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Icon type={'solid'} name={'clock'} size={12} color={'#94a3b8'} />
                <Text className="text-xs text-gray-500 font-medium ml-1">
                  {getTimeAgo(item.date)}
                </Text>
              </View>
              <Text className="text-xs text-gray-400 font-medium">
                {new Date(item.date).toLocaleString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Text>
            </View>
          </View>

          <View className="items-end gap-2">
            {item.contentImg && (
              <Image
                source={{ uri: item.contentImg }}
                className="w-12 h-12 rounded-lg bg-gray-50"
              />
            )}
            <TouchableOpacity
              className="w-8 h-8 rounded-lg bg-gray-50 items-center justify-center border border-gray-200"
              onPress={() => handleDelete(item._id)}
            >
              <Text className='font-bold'>x</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!item.read && (
          <View className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500" />
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="bg-white px-5 pt-3 pb-5 border-b border-gray-200 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-11 h-11 bg-indigo-500 rounded-xl justify-center items-center mr-3 shadow-lg shadow-indigo-500/30">
            <Icon type={'solid'} name={'bell'} size={24} color={'white'} />
          </View>
          <View>
            <Text className="text-2xl font-extrabold text-gray-900 mb-1">Notifications</Text>
            <Text className="text-sm text-gray-500 font-medium">
              {data.length} {data.length === 1 ? 'notification' : 'notifications'}
            </Text>
          </View>
        </View>
      </View>

      {adminProductCount?.length > 0 ? (
        !loading && adminDatabase !== null ? (
          data.length > 0 ? (
            <ScrollView
              className="flex-1"
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#6366f1']}
                  tintColor={'#6366f1'}
                  progressBackgroundColor="#ffffff"
                />
              }
              showsVerticalScrollIndicator={false}
            >
              <View className="p-4 pb-5">
                {data.map((item, index) => (
                  <NotificationCard key={item._id} item={item} index={index} />
                ))}
              </View>
            </ScrollView>
          ) : (
            <View className="flex-1 bg-white justify-center items-center px-8">
              <View className="items-center ">
                <View className="relative mb-8">
                  <View className="w-24 h-24 bg-gray-50 rounded-full justify-center items-center border-2 border-gray-200 z-10 relative">
                    <Icon type={'solid'} name={'bell'} size={32} color={'#cbd5e1'} />
                  </View>
                  <View className="absolute -top-2 -left-2 w-28 h-28 rounded-full bg-gray-100 z-0" />
                </View>
                <Text className="text-2xl font-extrabold text-gray-900 text-center mb-3">
                  No Notifications
                </Text>
                <Text className="text-base text-gray-500 text-center leading-6 mb-8 px-5">
                  You're all caught up! When you receive new notifications, they'll appear here.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  className="bg-indigo-500 px-6 py-4 rounded-2xl flex-row items-center shadow-lg shadow-indigo-500/30"
                  onPress={dataFetch}
                >
                  <Text className="text-white font-semibold text-base ml-2">Check for Updates</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        ) : (
          <NotificationSkeleton />
        )
      ) : (
        <NoNotificaProduct />
      )}
    </View>
  );
};

export default Notification;
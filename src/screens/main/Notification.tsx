import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
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
  const { deleteNoti } = useDeleteNoti()

  const dataFetch = () => {
    fetchNoti({
      id: adminDatabase.adminMainData._id,
      setdata: (notifications: any[]) => {
        setData(notifications);
      },
      setLoading,
    });
  }
  const onRefresh = useCallback(() => {
    setLoading(true)
    dataFetch();
  }, []);
  useEffect(() => {
    setLoading(true);
    if (adminDatabase) {
      dataFetch()
    }
  }, []);

  // Delete notification handler
  const deleteRow = (rowKey: string) => {
    setData(prevData => prevData.filter(item => item._id !== rowKey));
  };

  const renderItem = (data: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        backgroundColor: '#F9F5F6',
        borderRadius: 22,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        shadowColor: '#FF7622',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
        marginVertical: 8,
        marginHorizontal: 16,
      }}
    >
      <Image
        source={{ uri: data.item.senderImg }}
        style={{ width: 56, height: 56, borderRadius: 28, marginRight: 14, backgroundColor: '#eee' }}
      />
      {/* Text Content */}
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#222' }}>{data.item.title}</Text>
          <Text style={{ fontSize: 12, color: '#666' }}> {data.item.description}</Text>
        </View>
        <Text style={{ fontSize: 13, color: '#FF7622', marginTop: 2, fontWeight: '600' }}>
          {new Date(data.item.date).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </Text>
      </View>
      <Image
        source={{ uri: data.item.contentImg }}
        style={{ width: 56, height: 56, borderRadius: 16, marginLeft: 14, backgroundColor: '#eee' }}
      />
    </TouchableOpacity>
  );

  const renderHiddenItem = (data: any) => (
    <View
      style={{
        alignItems: 'flex-end',
        backgroundColor: 'gray',
        flex: 1,
        borderRadius: 22,
        marginVertical: 8,
        marginRight: 16,
        justifyContent: 'center',
        paddingRight: 20,
      }}
    >
      <TouchableOpacity activeOpacity={0.9} onPress={() => {
        deleteNoti(data.item._id)
        deleteRow(data.item._id)
      }} className='h-full flex items-center justify-center'>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} className='px-2 pt-2'>
      {adminProductCount > 0 ? !loading ? data.length > 0 ? (
        <ScrollView className='flex-1' refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } >
          <SwipeListView
            data={data}
            keyExtractor={item => item._id}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-80}
            disableRightSwipe
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </ScrollView>
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No data</Text>
      ) : (
        <NotificationSkeleton />
      ) : (
        <NoNotificaProduct />
      )}
    </View>
  );
};

export default Notification;

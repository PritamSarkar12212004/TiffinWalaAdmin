import React, { useState, useCallback, useRef, useMemo } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapView, { Callout, Marker } from 'react-native-maps';
import { userContext } from '../../util/context/ContextProvider';
import MapNoProduct from '../../components/noProduct/MapNoProduct';
import useFetchFollower from '../../hooks/api/follower/useFetchFollower';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RaiseHandMapSkeleton from '../../layout/skelaton/RaiseHandSkeleton';
import useDeleteFollower from '../../hooks/api/follower/useDeleteFollower';

const Risehand = () => {
  const navigation = useNavigation();
  const { deleteFollower } = useDeleteFollower();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const handleSheetChange = useCallback((index: any) => {
    console.log('handleSheetChange', index);
  }, []);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0);

  const { adminDatabase, adminProductCount } = userContext();
  const { fetchFollower } = useFetchFollower();

  const dataFetch = () => {
    setLoading(true);
    fetchFollower({
      id: adminDatabase.adminMainData._id,
      setLoading,
      setData,
    });
  };

  useFocusEffect(
    useCallback(() => {
      dataFetch();
      setMapKey((prev) => prev + 1);
      setMapLoading(true);
    }, [adminDatabase.adminMainData._id])
  );

  const defaultRegion = {
    latitude: 21.146633,
    longitude: 79.08886,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const deleteRow = (rowKey: string) => {
    deleteFollower(rowKey);
    setData((prevData: any) => prevData.filter((item: any) => item._id !== rowKey));
  };

  if (loading) {
    return <RaiseHandMapSkeleton />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {adminProductCount?.length > 0 ? (
          data?.length > 0 ? (
            <View style={{ flex: 1 }}>
              {/* Map */}
              <MapView
                key={mapKey}
                provider="google"
                style={{ flex: 1 }}
                initialRegion={
                  data.find(
                    (user: any) =>
                      user?.followerLocation?.coordinates?.length === 2
                  )
                    ? {
                      latitude: data[0].followerLocation.coordinates[1],
                      longitude: data[0].followerLocation.coordinates[0],
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.05,
                    }
                    : defaultRegion
                }
                userInterfaceStyle="light"
                showsCompass
                showsMyLocationButton
                loadingIndicatorColor="#FF7622"
                onMapReady={() => setMapLoading(false)}
              >
                {data
                  .filter(
                    (user: any) =>
                      user?.followerLocation?.coordinates?.length === 2
                  )
                  .map((user: any) => (
                    <Marker
                      key={user._id}
                      coordinate={{
                        latitude: user.followerLocation.coordinates[1],
                        longitude: user.followerLocation.coordinates[0],
                      }}
                      pinColor="#FF7622"
                    >
                      <Callout tooltip>
                        <View>
                          <Text style={styles.calloutText} numberOfLines={1}>
                            {user.follwerName || 'Unknown User'}
                          </Text>
                        </View>
                      </Callout>
                    </Marker>
                  ))}
              </MapView>

              {mapLoading && (
                <View style={styles.mapLoader}>
                  <ActivityIndicator size="large" color="#FF7622" />
                  <Text style={styles.mapLoaderText}>Loading Map...</Text>
                </View>
              )}

              {/* Bottom Sheet */}
              <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
                backgroundStyle={{
                  backgroundColor: 'white',
                }}
                style={styles.bottomSheet}
              >
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                  <View className="flex-1 mb-20">
                    {data.length <= 0 ? (
                      <Text className="text-gray-400 text-center mt-4">
                        No followers yet
                      </Text>
                    ) : (
                      data.map((item: any, index: number) => (
                        <View
                          key={index}
                          className="flex-row items-center justify-between bg-white rounded-xl shadow-sm p-3 mb-3 border border-gray-200"
                        >
                          {/* Left side: Image + Details */}
                          <View className="flex-row items-center">
                            <Image
                              source={{ uri: item.followerImg }}
                              className="w-12 h-12 rounded-full border border-gray-300"
                            />
                            <View className="ml-3">
                              <Text className="text-black text-base font-semibold">
                                {item.follwerName}
                              </Text>
                            </View>
                          </View>

                          <TouchableOpacity
                            className="flex-row items-center bg-red-50 px-3 py-2 rounded-lg"
                            onPress={() => deleteRow(item._id)}
                          >
                            <Text className="ml-1 text-red-600 text-sm font-medium">
                              Remove
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    )}
                  </View>
                </BottomSheetScrollView>
              </BottomSheet>
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <View style={styles.noDataContent}>
                <View style={styles.noDataIcon}>
                  <Text style={styles.noDataEmoji}>📍</Text>
                </View>
                <Text style={styles.noDataTitle}>No Followers Yet</Text>
                <Text style={styles.noDataDescription}>
                  You don't have any followers with location data at the moment.
                  When followers join with location sharing enabled, they'll appear here.
                </Text>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={dataFetch}
                >
                  <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        ) : (
          <MapNoProduct navigation={navigation} />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  mapLoaderText: {
    marginTop: 8,
    color: '#FF7622',
    fontWeight: 'bold',
  },
  calloutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -3 },
  },
  contentContainer: {
    padding: 16,
  },
  // Modern No Data Styles
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  noDataContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  noDataIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noDataEmoji: {
    fontSize: 36,
  },
  noDataTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'center',
  },
  noDataDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  refreshButton: {
    backgroundColor: '#FF7622',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#FF7622',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Risehand;
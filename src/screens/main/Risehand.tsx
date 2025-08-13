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
  const { deleteFollower } = useDeleteFollower()
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);
  const handleSheetChange = useCallback((index) => {
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
    deleteFollower(rowKey)
    setData(prevData => prevData.filter((item: any) => item._id !== rowKey));
  };

  if (loading) {
    return <RaiseHandMapSkeleton />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {adminProductCount > 0 ? (
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
                      user?.followerCoordinates?.coordinates?.length === 2
                  )
                    ? {
                      latitude: data[0].followerCoordinates.coordinates[1],
                      longitude: data[0].followerCoordinates.coordinates[0],
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
                      user?.followerCoordinates?.coordinates?.length === 2
                  )
                  .map((user: any) => (
                    <Marker
                      key={user._id}
                      coordinate={{
                        latitude: user.followerCoordinates.coordinates[1],
                        longitude: user.followerCoordinates.coordinates[0],
                      }}
                      pinColor="#FF7622" // This will make the pin orange
                    >
                      <Callout tooltip>
                        <View >
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
                  <View className='flex-1 mb-20'>

                    {
                      data.length <= 0 ? (
                        <Text className="text-gray-400 text-center mt-4">No followers yet</Text>
                      ) : (
                        data.map((item: any, index: number) => (
                          <View
                            key={index}
                            className="flex-row items-center justify-between bg-white rounded-xl shadow-sm p-3 mb-3 border border-gray-200"
                          >
                            <View className="flex-row items-center">
                              <Image
                                source={{ uri: item.followerImg }}
                                className="w-12 h-12 rounded-full border border-gray-300"
                              />
                              <View className="ml-3">
                                <Text className="text-black text-base font-semibold">
                                  {item.follwerName}
                                </Text>
                                <Text className="text-gray-500 text-xs">
                                  {item.followerLocation}
                                </Text>
                              </View>
                            </View>

                            {/* Right: Remove Button */}
                            <TouchableOpacity
                              className="flex-row items-center bg-red-50 px-3 py-2 rounded-lg"
                              onPress={() => deleteRow(item._id)}
                            >
                              {/* <Trash2 size={18} color="#DC2626" /> */}
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
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No data</Text>
          )
        ) : (
          <MapNoProduct navigation={navigation} />
        )}
      </View>
    </GestureHandlerRootView >
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
  markerOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 8,
  },
  markerInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  markerShadow: {
    width: 24,
    height: 8,
    backgroundColor: '#0002',
    borderRadius: 8,
    marginTop: -4,
    elevation: 2,
  },
  callout: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
    maxWidth: 220,
  },
  calloutImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FF7622',
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
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default Risehand;

import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { userContext } from '../../util/context/ContextProvider';
import MapNoProduct from '../../components/noProduct/MapNoProduct';
import useFetchFollower from '../../hooks/api/follower/useFetchFollower';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RaiseHandMapSkeleton from '../../layout/skelaton/RaiseHandSkeleton';
import useDeleteFollower from '../../hooks/api/follower/useDeleteFollower';
import Icon from '../../MainLogo/icon/Icon';

const { width, height } = Dimensions.get('window');

const Risehand = () => {
  const navigation = useNavigation();
  const { deleteFollower } = useDeleteFollower();
  const sheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);

  const snapPoints = useMemo(() => ['25%', '50%', '85%'], []);

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapKey, setMapKey] = useState(0);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [followerToRemove, setFollowerToRemove] = useState<any>(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
      setMapKey(prev => prev + 1);
      setMapLoading(true);

      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        })
      ]).start();
    }, [adminDatabase.adminMainData._id])
  );

  const defaultRegion: Region = {
    latitude: 21.146633,
    longitude: 79.08886,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  // Zoom to user location with animation
  const zoomToUserLocation = useCallback((user: any) => {
    if (!user?.followerLocation?.coordinates?.length === 2) return;

    setSelectedUser(user);

    const newRegion: Region = {
      latitude: user.followerLocation.coordinates[1],
      longitude: user.followerLocation.coordinates[0],
      latitudeDelta: 0.01, // Zoomed in
      longitudeDelta: 0.01,
    };

    // Animate map to user location
    mapRef.current?.animateToRegion(newRegion, 1000);

    // Close bottom sheet a bit for better map view
    sheetRef.current?.snapToIndex(0);
  }, []);

  // Open remove confirmation modal
  const openRemoveModal = (user: any) => {
    setFollowerToRemove(user);
    setRemoveModalVisible(true);
  };

  // Close remove confirmation modal
  const closeRemoveModal = () => {
    setRemoveModalVisible(false);
    setFollowerToRemove(null);
  };

  // Remove follower
  const handleRemoveFollower = async () => {
    if (!followerToRemove) return;

    try {
      await deleteFollower(followerToRemove._id);
      setData((prevData: any) => prevData.filter((item: any) => item._id !== followerToRemove._id));
      closeRemoveModal();

      // Reset selection if removed user was selected
      if (selectedUser?._id === followerToRemove._id) {
        setSelectedUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <RaiseHandMapSkeleton />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Remove Confirmation Modal */}
        {removeModalVisible && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalIcon}>
                <Icon type={'solid'} name={'user'} size={32} color={'#ef4444'} />
              </View>
              <Text style={styles.modalTitle}>Remove Follower</Text>
              <Text style={styles.modalText}>
                Remove {followerToRemove?.follwerName} from your followers?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeRemoveModal}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.removeButton]}
                  onPress={handleRemoveFollower}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {adminProductCount?.length > 0 && adminDatabase !== null ? (
          data?.length > 0 ? (
            <View style={{ flex: 1 }}>
              <MapView
                ref={mapRef}
                key={mapKey}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={
                  data?.find((user: any) => user?.followerLocation?.coordinates?.length === 2)
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
                loadingIndicatorColor="#3b82f6"
                onMapReady={() => setMapLoading(false)}
              >
                {data?.filter((user: any) => user?.followerLocation?.coordinates?.length === 2)
                  .map((user: any) => (
                    <Marker
                      key={user._id}
                      coordinate={{
                        latitude: user.followerLocation.coordinates[1],
                        longitude: user.followerLocation.coordinates[0],
                      }}
                      onPress={() => zoomToUserLocation(user)}
                    >
                      <Animated.View style={[
                        styles.markerContainer,
                        selectedUser?._id === user._id && styles.selectedMarker
                      ]}>
                        <Image
                          source={{ uri: user.followerImg }}
                          style={styles.markerImage}
                        />
                        <View style={[
                          styles.markerDot,
                          selectedUser?._id === user._id && styles.selectedMarkerDot
                        ]} />
                      </Animated.View>
                      <Callout tooltip>
                        <View style={styles.callout}>
                          <Image
                            source={{ uri: user.followerImg }}
                            style={styles.calloutImage}
                          />
                          <View style={styles.calloutTextContainer}>
                            <Text style={styles.calloutName}>{user.follwerName}</Text>
                            <Text style={styles.calloutLocation}>Following you</Text>
                          </View>
                        </View>
                      </Callout>
                    </Marker>
                  ))}
              </MapView>

              {mapLoading && (
                <View style={styles.mapLoader}>
                  <ActivityIndicator size="large" color="#3b82f6" />
                  <Text style={styles.mapLoaderText}>Loading Map...</Text>
                </View>
              )}

              {/* Bottom Sheet */}
              <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                backgroundStyle={styles.bottomSheetBackground}
                style={styles.bottomSheet}
              >
                <BottomSheetView style={styles.bottomSheetContent}>
                  <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>Your Followers</Text>
                    <Text style={styles.sheetSubtitle}>Tap to view on map • Swipe to see more</Text>
                  </View>

                  <BottomSheetScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                  >
                    {data?.map((item: any, index: number) => (
                      <TouchableOpacity
                        key={item._id}
                        onPress={() => zoomToUserLocation(item)}
                        activeOpacity={0.7}
                        style={[
                          styles.followerCard,
                          selectedUser?._id === item._id && styles.selectedFollowerCard
                        ]}
                      >
                        <View style={styles.followerInfo}>
                          <View style={styles.avatarContainer}>
                            <Image
                              source={{ uri: item.followerImg }}
                              style={styles.avatar}
                            />
                            <View style={styles.onlineIndicator} />
                          </View>
                          <View style={styles.followerDetails}>
                            <Text style={styles.followerName}>{item.follwerName}</Text>
                            <Text style={styles.followerId}>
                              @{item.followingId.substring(0, 12)}...
                            </Text>
                            {item?.followerLocation?.coordinates && (
                              <View style={styles.locationInfo}>
                                <Icon type={'solid'} name={'location-dot'} size={12} color={'#6b7280'} />
                                <Text style={styles.locationText}>Location available</Text>
                              </View>
                            )}
                          </View>
                        </View>

                        <TouchableOpacity
                          style={styles.removeButton}
                          className='py-2  rounded-xl px-4'
                          onPress={() => openRemoveModal(item)}
                          activeOpacity={0.8}
                        >
                          <Text className='text-sm text-white'>Remove</Text>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))}
                  </BottomSheetScrollView>
                </BottomSheetView>
              </BottomSheet>
            </View>
          ) : (
            <View style={styles.noDataContainer}>
              <View style={styles.noDataContent}>
                <View style={styles.noDataIcon}>
                  <Icon type={'solid'} name={'map'} size={40} color={'#9ca3af'} />
                </View>
                <Text style={styles.noDataTitle}>No Followers Nearby</Text>
                <Text style={styles.noDataDescription}>
                  When followers with location sharing join your network,
                  they'll appear here with their locations on the map.
                </Text>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={dataFetch}
                >
                  <Icon type={'solid'} name={'rotate'} size={18} color={'white'} />
                  <Text style={styles.refreshButtonText}>Refresh</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        ) : (
          <MapNoProduct navigation={navigation} />
        )}
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  animatedContainer: {
    flex: 1,
  },
  mapHeader: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    zIndex: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  resetButtonText: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  map: {
    flex: 1,
  },
  mapLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  mapLoaderText: {
    marginTop: 12,
    color: '#3b82f6',
    fontWeight: '600',
    fontSize: 16,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedMarker: {
    transform: [{ scale: 1.2 }],
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: 'white',
    marginTop: -6,
  },
  selectedMarkerDot: {
    backgroundColor: '#ef4444',
    transform: [{ scale: 1.2 }],
  },
  callout: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 200,
  },
  calloutImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  calloutTextContainer: {
    flex: 1,
  },
  calloutName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  calloutLocation: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  bottomSheetBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetHandle: {
    backgroundColor: '#e5e7eb',
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },
  bottomSheetContent: {
    flex: 1,
  },
  sheetHeader: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  followerCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  selectedFollowerCard: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.1,
  },
  followerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: 'white',
  },
  followerDetails: {
    flex: 1,
  },
  followerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  followerId: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    color: '#6b7280',
    marginLeft: 4,
  },

  // Modal Styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  removeButton: {
    backgroundColor: '#ef4444',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // No Data Styles
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 32,
  },
  noDataContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  noDataIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  noDataTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  noDataDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  refreshButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Risehand;
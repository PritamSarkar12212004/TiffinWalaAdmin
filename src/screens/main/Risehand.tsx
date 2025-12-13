
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  Platform,
} from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import Icon from '../../MainLogo/icon/Icon';
import { userContext } from '../../util/context/ContextProvider';
import useFetchFollower from '../../hooks/api/follower/useFetchFollower';
import useDeleteFollower from '../../hooks/api/follower/useDeleteFollower';

const { height } = Dimensions.get('window');

const Risehand = () => {
  const { adminDatabase } = userContext();
  const { fetchFollower } = useFetchFollower();
  const { deleteFollower } = useDeleteFollower();

  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const isMounted = useRef(true);

  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [removeModal, setRemoveModal] = useState(false);
  const [removeUser, setRemoveUser] = useState<any>(null);

  // BottomSheet heights (pixels – stable)
  const snapPoints = useMemo(() => [height * 0.25, height * 0.5, height * 0.85], []);

  // -------- DATA FETCH (SAFE) --------
  const loadFollowers = useCallback(() => {
    if (!adminDatabase?.adminMainData?._id) return;

    setLoading(true);

    fetchFollower({
      id: adminDatabase.adminMainData._id,
      setLoading: () => { },
      setData: (data: any[]) => {
        if (!isMounted.current) return;
        setFollowers(data || []);
        setLoading(false);
      },
    });
  }, [adminDatabase?.adminMainData?._id]);

  // -------- LIFECYCLE (CRASH SAFE) --------
  useFocusEffect(
    useCallback(() => {
      isMounted.current = true;
      loadFollowers();

      return () => {
        isMounted.current = false;
      };
    }, [loadFollowers])
  );

  // -------- FILTER USERS WITH LOCATION --------
  const usersWithLocation = useMemo(() => {
    return followers.filter(u => u?.followerLocation?.coordinates?.length === 2);
  }, [followers]);

  // -------- MAP INITIAL REGION --------
  const initialRegion: Region = useMemo(() => {
    if (usersWithLocation.length > 0) {
      const [lng, lat] = usersWithLocation[0].followerLocation.coordinates;
      return {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
    }
    return {
      latitude: 21.1466,
      longitude: 79.0888,
      latitudeDelta: 0.15,
      longitudeDelta: 0.15,
    };
  }, [usersWithLocation]);

  // -------- ZOOM TO USER (SAFE) --------
  const zoomToUser = useCallback((user: any) => {
    if (!isMounted.current) return;
    if (!mapRef.current) return;
    if (!user?.followerLocation?.coordinates) return;

    const [lng, lat] = user.followerLocation.coordinates;
    setSelectedUser(user);

    requestAnimationFrame(() => {
      if (!isMounted.current) return;
      mapRef.current?.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        700
      );
    });

    sheetRef.current?.snapToIndex(0);
  }, []);

  // -------- REMOVE FOLLOWER --------
  const confirmRemove = async () => {
    if (!removeUser) return;

    try {
      await deleteFollower(removeUser._id);
      setFollowers(prev => prev.filter(f => f._id !== removeUser._id));
      setRemoveModal(false);
    } catch {
      Alert.alert('Error', 'Unable to remove follower');
    }
  };

  // -------- PAGE LOADER --------
  if (loading) {
    return (
      <View style={styles.pageLoader}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.pageLoaderText}>Loading followers...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* MAP */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onMapReady={() => setMapReady(true)}
      >
        {usersWithLocation.map(user => (
          <Marker
            key={user._id}
            coordinate={{
              latitude: user.followerLocation.coordinates[1],
              longitude: user.followerLocation.coordinates[0],
            }}
            onPress={() => zoomToUser(user)}
          >
            <View style={styles.markerWrapper}>
              <Image
                source={{ uri: user.followerImg }}
                style={[
                  styles.markerImg,
                  selectedUser?._id === user._id && styles.markerSelected,
                ]}
              />
              <View style={styles.markerDot} />
            </View>

            <Callout onPress={() => zoomToUser(user)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{user.follwerName}</Text>
                <Text style={styles.calloutSub}>Tap to zoom</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* MAP LOADER */}
      {!mapReady && (
        <View style={styles.mapLoader}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.mapLoaderText}>Loading map...</Text>
        </View>
      )}

      {/* BOTTOM SHEET */}
      <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Your Followers</Text>

          {followers.map(user => (
            <TouchableOpacity
              activeOpacity={0.9}
              key={user._id}
              style={styles.card}
              onPress={() => zoomToUser(user)}
            >
              <Image source={{ uri: user.followerImg }} style={styles.avatar} />
              <View style={styles.cardInfo}>
                <Text style={styles.name}>{user.follwerName}</Text>
                <Text style={styles.subText}>
                  {user?.followerLocation ? 'Location shared' : 'No location'}
                </Text>
              </View>

            </TouchableOpacity>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>

      {/* REMOVE MODAL */}
      <Modal transparent visible={removeModal} animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Icon type="solid" name="user" size={36} color="#ef4444" />
            <Text style={styles.modalTitle}>Remove follower?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setRemoveModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmRemove}>
                <Text style={styles.confirmText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Risehand;

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  map: { flex: 1 },

  pageLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pageLoaderText: { marginTop: 12, color: '#3b82f6', fontWeight: '600' },

  mapLoader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapLoaderText: { marginTop: 10, color: '#3b82f6', fontWeight: '600' },

  markerWrapper: { alignItems: 'center' },
  markerImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 3,
    borderColor: 'white',
  },
  markerSelected: { transform: [{ scale: 1.2 }] },
  markerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
    marginTop: -4,
  },

  callout: { padding: 8, alignItems: 'center' },
  calloutTitle: { fontWeight: '700', fontSize: 14 },
  calloutSub: { fontSize: 11, color: '#6b7280' },

  sheetContent: { padding: 16 },
  sheetTitle: { fontSize: 22, fontWeight: '800', marginBottom: 12 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'white',
    marginBottom: 12,
    elevation: 2,
  },
  avatar: { width: 48, height: 48, borderRadius: 14, marginRight: 12 },
  cardInfo: { flex: 1 },
  name: { fontWeight: '700', fontSize: 15 },
  subText: { fontSize: 12, color: '#6b7280' },
  removeText: { color: '#ef4444', fontWeight: '600' },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginVertical: 16 },
  modalActions: { flexDirection: 'row', gap: 20 },
  cancelText: { color: '#374151', fontWeight: '600' },
  confirmText: { color: '#ef4444', fontWeight: '700' },
});

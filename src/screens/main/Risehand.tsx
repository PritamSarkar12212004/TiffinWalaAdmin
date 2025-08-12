import React, { useState, useCallback } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import { userContext } from '../../util/context/ContextProvider';
import MapNoProduct from '../../components/noProduct/MapNoProduct';
import useFetchFollower from '../../hooks/api/follower/useFetchFollower';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RaiseHandMapSkeleton from '../../layout/skelaton/RaiseHandSkeleton';

const Risehand = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true); // API loading
  const [mapLoading, setMapLoading] = useState(true); // Map render loading
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

  // Reload data & remount map on tab focus
  useFocusEffect(
    useCallback(() => {
      dataFetch();
      setMapKey(prev => prev + 1);
      setMapLoading(true);
    }, [adminDatabase.adminMainData._id])
  );

  const defaultRegion = {
    latitude: 21.146633,
    longitude: 79.08886,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  if (loading) {
    return <RaiseHandMapSkeleton />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {adminProductCount > 0 ? (
        data.length > 0 ? (
          <>
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
              onMapReady={() => setMapLoading(false)} // ✅ Map ready
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
                  >
                    {/* Marker Icon */}
                    <View style={{ alignItems: 'center' }}>
                      <LinearGradient
                        colors={['#FF7622', '#FF8A4C']}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 24,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 3,
                          borderColor: '#fff',
                          elevation: 8,
                        }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            overflow: 'hidden',
                          }}
                        >
                          <Image
                            source={{ uri: user.followerImg }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                          />
                        </View>
                      </LinearGradient>
                      <View
                        style={{
                          width: 24,
                          height: 8,
                          backgroundColor: '#0002',
                          borderRadius: 8,
                          marginTop: -4,
                          elevation: 2,
                        }}
                      />
                    </View>

                    {/* Callout */}
                    <Callout tooltip alphaHitTest>
                      <View
                        style={{
                          backgroundColor: '#fff',
                          borderRadius: 12,
                          paddingVertical: 10,
                          paddingHorizontal: 12,
                          alignItems: 'center',
                          justifyContent: 'center',
                          minWidth: 130,
                          maxWidth: 220,
                        }}
                      >
                        <Image
                          source={{ uri: user.followerImg }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            marginBottom: 8,
                            borderWidth: 2,
                            borderColor: '#FF7622',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#333',
                            textAlign: 'center',
                          }}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                        >
                          {user.follwerName || 'Unknown User'}
                        </Text>
                      </View>
                    </Callout>
                  </Marker>
                ))}
            </MapView>

            {/* 🔹 Overlay loader when map is rendering */}
            {mapLoading && (
              <View style={styles.mapLoader}>
                <ActivityIndicator size="large" color="#FF7622" />
                <Text style={{ marginTop: 8, color: '#FF7622', fontWeight: 'bold' }}>
                  Loading Map...
                </Text>
              </View>
            )}
          </>
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No data</Text>
        )
      ) : (
        <MapNoProduct navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Risehand;

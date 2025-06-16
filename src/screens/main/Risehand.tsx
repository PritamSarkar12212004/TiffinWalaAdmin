// /screens/Risehand.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

const Risehand = () => {
  const baseLatitude = 21.1458;
  const baseLongitude = 79.0882;

  const randomUsers = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    latitude: baseLatitude + (Math.random() - 0.5) * 0.1,
    longitude: baseLongitude + (Math.random() - 0.5) * 0.1,
  }));

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider="google"
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 21.146633,
          longitude: 79.088860,
          latitudeDelta: 0.05, // Zoomed-in view
          longitudeDelta: 0.05,
        }}
        userInterfaceStyle="light"
        showsCompass
        showsMyLocationButton
        loadingIndicatorColor='orange'

      >
        {randomUsers.map(user => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
          >
            <Callout tooltip alphaHitTest>
              <View
                className='px-4 py-2 bg-[#FF7622] rounded-lg shadow-lg '
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',

                  }}
                >
                  {user.name}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Risehand;

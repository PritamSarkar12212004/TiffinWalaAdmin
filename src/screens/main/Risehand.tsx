import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../../MainLogo/icon/Icon';
import { userContext } from '../../util/context/ContextProvider';
import MapNoProduct from '../../components/noProduct/MapNoProduct';

const Risehand = () => {
  const { adminDatabase } = userContext()
  const baseLatitude = 21.1458;
  const baseLongitude = 79.0882;

  const randomUsers = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    latitude: baseLatitude + (Math.random() - 0.5) * 0.1,
    longitude: baseLongitude + (Math.random() - 0.5) * 0.1,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
      {
          adminDatabase.User_Post_Count < 0  ? <MapView
          provider="google"
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 21.146633,
            longitude: 79.088860,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          userInterfaceStyle="light"
          showsCompass
          showsMyLocationButton
          loadingIndicatorColor="#FF7622"
        >
          {randomUsers.map(user => (
            <Marker
              key={user.id}
              coordinate={{
                latitude: user.latitude,
                longitude: user.longitude,
              }}
            >
              {/* Modern 3D-style marker */}
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
                    shadowColor: '#FF7622',
                    shadowOpacity: 0.25,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: 4 },
                  }}
                >
                  <Icon name="user" size={24} color="#fff" type="solid" />
                </LinearGradient>
                {/* Shadow below marker for 3D effect */}
                <View style={{
                  width: 24,
                  height: 8,
                  backgroundColor: '#0002',
                  borderRadius: 8,
                  marginTop: -4,
                  elevation: 2,
                }} />
              </View>
              <Callout tooltip alphaHitTest>
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    backgroundColor: '#FF7622',
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOpacity: 0.18,
                    shadowRadius: 6,
                    elevation: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
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
        </MapView> : <MapNoProduct />
      }

    </View>
  );
};

export default Risehand;
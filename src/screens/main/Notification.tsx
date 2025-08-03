import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { userContext } from '../../util/context/ContextProvider';
import NoNotificaProduct from '../../components/noProduct/NoNotificaProduct';


const notifications = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  name: 'Pritam Sarkar',
  action: 'Following Sai Mess',
  date: 'Today',
  avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
}));

const Notification = () => {
  const { adminDatabase } = userContext()
  return (
    <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
      {
        adminDatabase.User_Post_Count < 0 ? <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ width: '100%', paddingHorizontal: 16, gap: 18, paddingTop: 18, }} className='pb-32'>
            {notifications.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 22,
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  shadowColor: '#FF7622',
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 2,
                }}
              >
                {/* Left Avatar */}
                <Image source={{ uri: item.avatar }} style={{ width: 56, height: 56, borderRadius: 28, marginRight: 14, backgroundColor: '#eee' }} />

                {/* Text Content */}
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#222' }}>{item.name}</Text>
                    <Text style={{ fontSize: 16, color: '#666' }}> {item.action}</Text>
                  </View>
                  <Text style={{ fontSize: 13, color: '#FF7622', marginTop: 2, fontWeight: '600' }}>{item.date}</Text>
                </View>

                {/* Right Image */}
                <Image source={{ uri: item.image }} style={{ width: 56, height: 56, borderRadius: 16, marginLeft: 14, backgroundColor: '#eee' }} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView> : <NoNotificaProduct />
      }
    </View>
  );
};

export default Notification;

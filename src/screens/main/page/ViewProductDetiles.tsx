import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '../../../MainLogo/icon/Icon'

const ViewProductDetiles = () => {
    const [product, setProduct] = useState<any>(null)
    const route = useRoute()
    const navigation = useNavigation()
    const { data }: any = route.params
    useEffect(() => {
        setProduct(data)
    }, [data])
    return (
        <View className='flex-1 bg-white px-3 ' >
            <PageNavigation route={'Product List'} />
            {
                product ? <View className='flex-1'>
                    <FlatList
                        data={data}
                        style={{ width: '100%' }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ViewProductAnalazeDetiles' as never, { data: item })}
                                    activeOpacity={0.9}
                                    className='w-full'
                                    style={{
                                        marginBottom: 20,
                                        backgroundColor: 'white',
                                        borderRadius: 20,
                                        padding: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.08,
                                        shadowRadius: 12,
                                        elevation: 6,
                                    }}
                                >
                                    <View
                                        style={{
                                            borderRadius: 16,
                                            overflow: 'hidden',
                                            marginBottom: 12,
                                        }}
                                    >
                                        <Image
                                            source={{ uri: item?.postCoverImage[0] }}
                                            style={{ width: '100%' }}
                                            className='h-72'
                                            resizeMode="cover"
                                        />
                                    </View>

                                    {/* Title and Description */}
                                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#1E293B' }}>{item?.postTitle}</Text>
                                    <Text style={{ fontSize: 14, color: '#64748B', marginVertical: 6 }}>
                                        {item?.postDescription.slice(0, 80)}...
                                    </Text>

                                    {/* Info Row */}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                                        <Text style={{ color: '#10B981', fontWeight: '700' }}>₹{item?.postPrice}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon name="heart" size={14} type="solid" color="#EF4444" />
                                                <Text style={{ marginLeft: 4, fontSize: 12 }}>{item?.productLikes.length}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Icon name="eye" size={14} type="solid" color="#6366F1" />
                                                <Text style={{ marginLeft: 4, fontSize: 12 }}>{item?.postTotalViews}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Location */}
                                    <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>📍 {item?.postLocation}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />

                </View> : null
            }

        </View>
    )
}

export default ViewProductDetiles
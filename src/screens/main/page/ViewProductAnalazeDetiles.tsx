import { View, Dimensions, TouchableOpacity, Text, ScrollView, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import PageNavigation from '../../../layout/navigation/PageNavigation';
import Icon from '../../../MainLogo/icon/Icon';
import useDeleteProduct from '../../../hooks/api/product/useDeleteProduct';
import { userContext } from '../../../util/context/ContextProvider';
const { width } = Dimensions.get("window");

const ModernViewProductDetails = () => {
    const [deleteloading, setDeleteloading] = useState<boolean>(false)
    const navigation = useNavigation()
    const flatListRef = useRef(null);
    const route = useRoute();
    const { data }: any = route.params;
    const [imgCover, setimgCover] = useState(data.postCoverImage);
    const [imgPost, setimgPost] = useState(data.postMenu)
    const MianImg = [
        ...imgCover,
        ...imgPost
    ]

    const { deleteProduct } = useDeleteProduct()
    const deleteProductFunc = (payload: any) => {
        setDeleteloading(true)
        deleteProduct({ id: payload, loading: setDeleteloading, navigation: navigation })
    }
    const renderItem = ({ item }: any) => (

        <View style={{ width, height: 280 }}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <PageNavigation route={'Product Details'} />
                <FlatList
                    ListFooterComponent={() => (
                        <View style={styles.wrapper}>
                            <FlatList
                                ref={flatListRef}
                                data={MianImg}
                                renderItem={renderItem}
                                keyExtractor={(_, index) => index.toString()}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                style={{ marginBottom: 15, }}
                            />
                            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                                <View style={styles.headerSection}>
                                    <Text style={styles.title}>{data.postTitle}</Text>
                                    <View style={styles.locationRow}>
                                        <Icon type={'solid'} name='location-dot' color='orange' size={18} />
                                        <Text style={styles.locationText}>{data.postLocation}</Text>
                                    </View>
                                </View>
                                <Text style={styles.sectionTitle}>Description</Text>
                                <Text style={styles.description}>{data.postDescription}</Text>
                                <Text style={styles.sectionTitle}>Food Type</Text>
                                <ScrollView showsVerticalScrollIndicator={false} horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                                    {data.postFoodType.map((item, index) => (
                                        <TouchableOpacity key={index} style={styles.foodTypeChip}>
                                            <Icon type={'solid'} name={'leaf'} size={16} color={item === 'Vegan' || item === 'Veg' ? 'green' : 'red'} />
                                            <Text style={styles.foodTypeText}>{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <Text style={styles.sectionTitle}>Available Days</Text>
                                <View style={styles.daysWrapper}>
                                    {data.postValidDay.map((item, index) => (
                                        <View key={index} style={styles.dayItem}>
                                            <Icon type={'solid'} name={'calendar-days'} size={16} color={'orange'} />
                                            <Text style={styles.dayText}>{item}</Text>
                                        </View>
                                    ))}

                                </View>
                            </ScrollView>
                            <View className='w-full flex items-center justify-center'>
                                {
                                    deleteloading ?
                                        <TouchableOpacity activeOpacity={0.9} className='w-full h-14 bg-red-500 rounded-3xl mb-10 mt-5 flex items-center justify-center'>
                                            <ActivityIndicator size={'small'} color={'white'} />
                                        </TouchableOpacity> : <TouchableOpacity onPress={() => deleteProductFunc(data._id)} className='w-full h-14 bg-red-500 rounded-3xl mb-10 mt-5 flex items-center justify-center ' activeOpacity={0.8}>
                                            <Text className='text-white text-lg font-semibold tracking-widest'>Delete Product</Text>
                                        </TouchableOpacity>
                                }

                            </View>
                        </View>
                    )}
                />
            </View>

        </View>


    );
};

export default ModernViewProductDetails;

const styles = StyleSheet.create({
    contentContainer: {
        backgroundColor: "white",
    },
    itemContainer: {
        padding: 6,
        margin: 6,
        backgroundColor: "#eee",
    },
    container: { flex: 1, backgroundColor: 'white', paddingHorizontal: 4 },
    wrapper: { flex: 1, borderRadius: 20, overflow: 'hidden' },
    image: { width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20 },
    blurBackground: { position: 'absolute', top: 0, left: 0, right: 0, height: 280 },
    headerSection: { paddingHorizontal: 20, marginBottom: 12 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#212529' },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    locationText: { fontSize: 14, color: '#6c757d', marginLeft: 6 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
    statItem: { flexDirection: 'row', alignItems: 'center' },
    statText: { fontSize: 15, fontWeight: '600' },
    priceTag: { flexDirection: 'row', alignItems: 'center' },
    priceText: { fontSize: 16, fontWeight: 'bold', color: 'green' },
    description: { fontSize: 15, color: '#495057', paddingHorizontal: 20, marginBottom: 16 },
    sectionTitle: { fontSize: 17, fontWeight: 'bold', marginTop: 12, paddingHorizontal: 20 },
    horizontalScroll: { marginVertical: 10, paddingLeft: 20 },
    foodTypeChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: "#e2e3e5", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 24, marginRight: 10 },
    foodTypeText: { fontSize: 14, fontWeight: '500', marginLeft: 6 },
    daysWrapper: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, marginTop: 10 },
    dayItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 10 },
    dayText: { fontSize: 14, color: '#6c757d', marginLeft: 6 },
    chart: { marginVertical: 18, borderRadius: 12, alignSelf: 'center' },
    contactButton: { backgroundColor: '#2563eb', paddingVertical: 14, borderRadius: 24, alignItems: 'center', marginVertical: 18, marginHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
    contactButtonText: { fontSize: 17, fontWeight: 'bold', color: '#fff' },
    chartsSection: {
        gap: 20,
        marginBottom: 32,
    },
    metricsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    chartCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    chartTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    chartIconContainer: {
        width: 65,
        height: 65,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    metricsRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    metricCard: {
        flex: 1,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 6,
    },
    metricGradient: {
        borderRadius: 20,
        padding: 20,
        minHeight: 120,
    },
    metricContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    metricValue: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 4,
    },
    metricTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    metricSubtitle: {
        fontSize: 12,
        fontWeight: '500',
    },
});

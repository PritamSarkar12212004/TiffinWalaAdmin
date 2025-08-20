import { View, Dimensions, TouchableOpacity, Text, ScrollView, FlatList, Image, StyleSheet } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import PageNavigation from '../../../layout/navigation/PageNavigation';
import Icon from '../../../MainLogo/icon/Icon';
const { width } = Dimensions.get("window");
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BarChart } from 'react-native-gifted-charts';
import { ChartCardProps, MetricCardProps } from '../../../interface/dashboard/MetricCardProps';
import { barData } from '../../../demo/data/DasboardData';
const ModernViewProductDetails = () => {
    const flatListRef = useRef(null);
    const route = useRoute();
    const { data }: any = route.params;
    console.log(data);
    const [imgCover, setimgCover] = useState(data.postCoverImage);
    const [imgPost, setimgPost] = useState(data.postMenu)
    const MianImg = [
        ...imgCover,
        ...imgPost
    ]
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
    const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, gradient = false, subtitle }) => (
        <TouchableOpacity activeOpacity={0.9} style={styles.metricCard}>
            <View style={[styles.metricGradient, { backgroundColor: gradient ? color : '#FFFFFF' }]}>
                <View style={styles.metricContent}>
                    <View style={[styles.iconContainer, { backgroundColor: gradient ? 'rgba(255,255,255,0.2)' : color + '15' }]}>
                        <Icon name={icon} size={20} type="solid" color={gradient ? 'white' : color} />
                    </View>
                    <Text style={[styles.metricValue, { color: gradient ? 'white' : color }]}>{value}</Text>
                    <Text style={[styles.metricTitle, { color: gradient ? 'rgba(255,255,255,0.9)' : '#64748B' }]}>{title}</Text>
                    {subtitle && (
                        <Text style={[styles.metricSubtitle, { color: gradient ? 'rgba(255,255,255,0.7)' : '#94A3B8' }]}>{subtitle}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );



    const renderItem = ({ item }: any) => (

        <View style={{ width, height: 280 }}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );
    const ChartCard: React.FC<ChartCardProps> = ({ title, children, icon, iconColor = '#6366F1' }) => (
        <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
                <View style={styles.chartTitleContainer}>
                    <View style={[styles.chartIconContainer, { backgroundColor: iconColor + '15' }]}>
                        <Icon name={icon} size={18} type="solid" color={iconColor} />
                    </View>
                    <Text style={styles.chartTitle}>{title}</Text>
                </View>
            </View>
            {children}
        </View>
    );


    return (
        <GestureHandlerRootView style={styles.container}>
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
                            <ScrollView showsVerticalScrollIndicator={false}>
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
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
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
                                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                        sheetRef.current?.snapToIndex(2)
                                    }} className='w-full h-14 bg-orange-500 mt-5 mb-3 rounded-3xl flex items-center justify-center'>
                                        <Text className='text-center text-white text-lg font-bold'>More Details</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    )}
                />
            </View>
            <BottomSheet

                ref={sheetRef}
                index={-1}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                enablePanDownToClose
            >
                <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                    <View className='flex-1  px-3 gap-5'>
                        <View className='w-full flex px-2 flex-row items-center justify-between'>
                            <View style={styles.metricsRow}>
                                <MetricCard title="Total Views" value={data.postTotalViews} icon="street-view" color="#6366F1" gradient />
                                <MetricCard title="Total Like" value={data.productLikes.length} icon="heart" color="#10B981" gradient />

                            </View>

                        </View>
                        <View className='w-full gap-5 flex'>
                            <ChartCard title="Weekly Traffic" icon="chart-bar" iconColor="#6366F1">
                                <BarChart
                                    barWidth={18}
                                    noOfSections={4}
                                    barBorderRadius={6}
                                    frontColor="#6366F1"
                                    data={barData}
                                    yAxisThickness={0}
                                    xAxisThickness={0}
                                    yAxisTextStyle={{ color: '#64748B', fontSize: 10 }}
                                    yAxisColor="transparent"
                                    xAxisColor="transparent"
                                    height={160}
                                />
                            </ChartCard>
                            <ChartCard title="Weekly Traffic" icon="chart-bar" iconColor="#6366F1">
                                <BarChart
                                    barWidth={18}
                                    noOfSections={4}
                                    barBorderRadius={6}
                                    frontColor="#6366F1"
                                    data={barData}
                                    yAxisThickness={0}
                                    xAxisThickness={0}
                                    yAxisTextStyle={{ color: '#64748B', fontSize: 10 }}
                                    yAxisColor="transparent"
                                    xAxisColor="transparent"
                                    height={160}
                                />
                            </ChartCard>
                        </View>
                    </View>
                </BottomSheetScrollView>
            </BottomSheet>
        </GestureHandlerRootView>

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

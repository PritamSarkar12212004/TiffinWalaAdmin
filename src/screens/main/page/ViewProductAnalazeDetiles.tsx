import { View, Dimensions, TouchableOpacity, Text, ScrollView, FlatList, Image, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    LineChart,
} from "react-native-chart-kit";
import PageNavigation from '../../../layout/navigation/PageNavigation';
import GelerySlider from '../../../components/graph/GelerySlider';
import Icon from '../../../MainLogo/icon/Icon';

const { width } = Dimensions.get("window");

const ViewProductAnalazeDetiles = () => {
    const flatListRef = useRef(null);
    const route = useRoute();
    const { data } = route.params;

    const renderItem = ({ item }) => (
        <View style={{ width, height: 280 }}>
            <Image
                source={{ uri: item }}
                style={styles.image}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <PageNavigation route={'Product Details'} />

            {/* Image slider */}
            <FlatList
                ref={flatListRef}
                data={data.postCoverImage}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 15 }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Title & Location */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>{data.postTitle}</Text>
                    <View style={styles.locationRow}>
                        <Icon type={'solid'} name='location-dot' color='orange' size={18} />
                        <Text style={styles.locationText}>{data.postLocation}</Text>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Icon type={'solid'} name='heart' color='orange' size={20} />
                        <Text style={styles.statText}>{data.productLikes.length}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon type={'solid'} name='eye' color='orange' size={20} />
                        <Text style={styles.statText}>{data.postTotalViews}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Icon type={'solid'} name='location-dot' color='orange' size={20} />
                        <Text style={styles.statText}>{data.distanceText}</Text>
                    </View>
                    <View style={styles.priceTag}>
                        <Icon type={'solid'} name='money-bill' color='green' size={20} />
                        <Text style={styles.priceText}>₹ {data.postPrice}</Text>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.description}>{data.postDescription}</Text>

                {/* Food Types */}
                <Text style={styles.sectionTitle}>Food Type</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 10 }}>
                    {data.postFoodType.map((item, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.8} style={styles.foodTypeChip}>
                            <View style={styles.foodTypeIcon}>
                                <Icon type={'solid'} name={'leaf'} size={16} color={item === 'Vegan' || item === 'Veg' ? 'green' : 'red'} />
                            </View>
                            <Text style={styles.foodTypeText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Available Days */}
                <Text style={styles.sectionTitle}>Available Days</Text>
                <View style={styles.daysWrapper}>
                    {data.postValidDay.map((item, index) => (
                        <View key={index} style={styles.dayItem}>
                            <Icon name={'calendar-days'} type={'solid'} size={16} color={'orange'} />
                            <Text style={styles.dayText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Chart */}
                <LineChart
                    data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                        datasets: [
                            {
                                data: Array.from({ length: 6 }, () => Math.random() * 100)
                            }
                        ]
                    }}
                    width={width - 30}
                    height={200}
                    yAxisLabel="₹"
                    chartConfig={{
                        backgroundGradientFrom: "#ff9a9e",
                        backgroundGradientTo: "#fad0c4",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255,255,255,${opacity})`,
                        style: { borderRadius: 12 },
                        propsForDots: { r: "5", strokeWidth: "2", stroke: "#fff" }
                    }}
                    bezier
                    style={{ marginVertical: 15, borderRadius: 12 }}
                />

                {/* Contact Button */}
                <TouchableOpacity activeOpacity={0.8} style={styles.contactButton}>
                    <Text style={styles.contactButtonText}>Contact Details</Text>
                </TouchableOpacity>

                {/* Gallery Slider */}
            </ScrollView>
        </View>
    );
};

export default ViewProductAnalazeDetiles;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    image: { width: '100%', height: '100%', resizeMode: 'cover' },
    headerSection: { paddingHorizontal: 15, marginBottom: 10 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#222' },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    locationText: { fontSize: 13, color: '#6c757d', marginLeft: 4 },
    statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, marginBottom: 10 },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    statText: { fontSize: 14, fontWeight: '600' },
    priceTag: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    priceText: { fontSize: 15, fontWeight: 'bold', color: 'green' },
    description: { fontSize: 14, color: '#495057', paddingHorizontal: 15, marginBottom: 15 },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 10, paddingHorizontal: 15 },
    foodTypeChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#FFD27C",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8
    },
    foodTypeIcon: {
        height: 26,
        width: 26,
        borderRadius: 13,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6
    },
    foodTypeText: { fontSize: 13, fontWeight: '500' },
    daysWrapper: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, marginTop: 8 },
    dayItem: { flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 8 },
    dayText: { fontSize: 13, color: '#6c757d', marginLeft: 4 },
    contactButton: {
        backgroundColor: '#ff8c00',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 15,
        elevation: 3
    },
    contactButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' }
});

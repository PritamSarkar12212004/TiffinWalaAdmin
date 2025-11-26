import { View, Dimensions, TouchableOpacity, Text, ScrollView, FlatList, Image, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import PageNavigation from '../../../layout/navigation/PageNavigation';
import Icon from '../../../MainLogo/icon/Icon';
import useDeleteProduct from '../../../hooks/api/product/useDeleteProduct';
import { userContext } from '../../../util/context/ContextProvider';

const { width } = Dimensions.get("window");

const ModernViewProductDetails = () => {
    const [deleteloading, setDeleteloading] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigation = useNavigation();
    const flatListRef = useRef<FlatList>(null);
    const route = useRoute();
    const { data }: any = route.params;
    const imgCover = data.postCoverImage
    const imgPost = data.postMenu
    const MianImg = [...imgCover, ...imgPost];

    const { deleteProduct } = useDeleteProduct();
    const { adminDatabase } = userContext();

    const deleteProductFunc = (payload: any) => {
        setDeleteloading(true);
        setShowDeleteModal(false);
        deleteProduct({
            id: payload,
            userId: adminDatabase.adminMainData._id,
            loading: setDeleteloading,
            navigation: navigation
        });
    };

    const openDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const renderItem = ({ item }: any) => (
        <View style={{ width, height: 320 }}>
            <Image source={{ uri: item }} style={styles.image} />
        </View>
    );

    const onScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setActiveIndex(index);
    };

    const handleSubImagePress = (index: number) => {
        setActiveIndex(index);
        flatListRef.current?.scrollToIndex({ index, animated: true });
    };

    return (
        <View className="flex-1 bg-white">
            {/* Delete Confirmation Modal */}
            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
                onRequestClose={closeDeleteModal}
            >
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
                        {/* Warning Icon */}
                        <View className="items-center mb-4">
                            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center">
                                <Icon type={'solid'} name={'trash'} size={28} color={'#ef4444'} />
                            </View>
                        </View>

                        {/* Title */}
                        <Text className="text-xl font-bold text-center text-gray-900 mb-2">
                            Delete Product
                        </Text>

                        {/* Message */}
                        <Text className="text-gray-600 text-center mb-6 leading-6">
                            Are you sure you want to delete "{data.postTitle}"? This action cannot be undone and all product data will be permanently removed.
                        </Text>

                        {/* Buttons */}
                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={closeDeleteModal}
                                className="flex-1 h-12 bg-gray-200 rounded-xl flex items-center justify-center"
                                activeOpacity={0.7}
                            >
                                <Text className="text-gray-800 font-semibold text-base">
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => deleteProductFunc(data._id)}
                                className="flex-1 h-12 bg-red-500 rounded-xl flex flex-row items-center justify-center"
                                activeOpacity={0.8}
                            >
                                {deleteloading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <>
                                        <Icon type={'solid'} name={'trash'} size={16} color={'white'} />
                                        <Text className="text-white font-semibold text-base ml-2">
                                            Delete
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Header */}
            <View className='w-full flex px-3'>
                <PageNavigation route={'Product Details'} />
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="flex-1 px-4"
                contentContainerStyle={styles.scrollContent}
            >
                {/* Image Carousel */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={MianImg}
                        renderItem={renderItem}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        getItemLayout={(data, index) => ({
                            length: width,
                            offset: width * index,
                            index,
                        })}
                    />

                    {/* Image Indicators */}
                    <View className="absolute bottom-4 w-full flex-row justify-center">
                        {MianImg.map((_, index) => (
                            <View
                                key={index}
                                className={`h-2 mx-1 rounded-full ${index === activeIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
                                    }`}
                            />
                        ))}
                    </View>
                </View>

                {/* Thumbnail Images */}
                {MianImg.length > 1 && (
                    <View className="px-4 mt-4">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="mb-4"
                        >
                            {MianImg.slice(0, 5).map((image, index) => (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    key={index}
                                    onPress={() => handleSubImagePress(index)}
                                    className={`mr-3 rounded-xl overflow-hidden border-2 ${index === activeIndex ? 'border-blue-500' : 'border-gray-200'
                                        }`}
                                >
                                    <Image
                                        source={{ uri: image }}
                                        className="w-16 h-16"
                                    />
                                    {index === 4 && MianImg.length > 5 && (
                                        <View className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Text className="text-white text-xs font-bold">
                                                +{MianImg.length - 5}
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}

                {/* Product Title and Location */}
                <View className="mb-6">
                    <Text className="text-2xl font-bold text-gray-900 mb-2">
                        {data.postTitle}
                    </Text>
                    <View className="flex-row items-center">
                        <Icon type={'solid'} name='location-dot' color='#f97316' size={18} />
                        <Text className="text-gray-600 ml-2 text-base">
                            {data.postLocation}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">
                        Description
                    </Text>
                    <Text className="text-gray-600 leading-6 text-base">
                        {data.postDescription}
                    </Text>
                </View>

                {/* Food Type */}
                <View className="mb-6">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">
                        Food Type
                    </Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        className="flex-row"
                    >
                        {data.postFoodType.map((item: string, index: number) => (
                            <View
                                key={index}
                                className="flex-row items-center bg-gray-100 px-4 py-2 rounded-full mr-3"
                            >
                                <Icon
                                    type={'solid'}
                                    name={'leaf'}
                                    size={16}
                                    color={item === 'Vegan' || item === 'Veg' ? 'green' : 'red'}
                                />
                                <Text className="text-gray-700 ml-2 font-medium">
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Available Days */}
                <View className="mb-8">
                    <Text className="text-lg font-semibold text-gray-900 mb-3">
                        Available Days
                    </Text>
                    <View className="flex-row flex-wrap">
                        {data.postValidDay.map((item: string, index: number) => (
                            <View
                                key={index}
                                className="flex-row items-center bg-orange-50 px-4 py-3 rounded-xl mr-3 mb-3"
                            >
                                <Icon type={'solid'} name={'calendar-days'} size={16} color={'#f97316'} />
                                <Text className="text-orange-700 ml-2 font-medium">
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Delete Button */}
                <View className="mb-10">
                    {deleteloading ? (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className="w-full h-14 bg-red-400 rounded-2xl mb-5 flex items-center justify-center"
                            disabled
                        >
                            <ActivityIndicator size={'small'} color={'white'} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={openDeleteModal}
                            className="w-full h-14 bg-red-500 rounded-2xl mb-5 flex flex-row items-center justify-center active:opacity-80 shadow-lg shadow-red-200"
                            activeOpacity={0.8}
                        >
                            <Icon type={'solid'} name={'trash'} size={18} color={'white'} />
                            <Text className="text-white text-lg font-semibold tracking-wide ml-2">
                                Delete Product
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        height: 320,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    scrollContent: {
        paddingBottom: 20,
    },
});

export default ModernViewProductDetails;
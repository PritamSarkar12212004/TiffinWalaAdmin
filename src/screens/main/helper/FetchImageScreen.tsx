import {
    View,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import FetchImageModule from '../../../hooks/module/FetchImageModule'
import PageNavigation from '../../../layout/navigation/PageNavigation'
import {
    CheckCircleIcon,
    ChevronRightIcon,
    PhotoIcon,
    ExclamationTriangleIcon
} from 'react-native-heroicons/solid'
import { useRoute } from '@react-navigation/native'
import useProductCreate from '../../../hooks/useProductCreate'
import { useNotify } from '../../../components/wraper/Wraper'
const FetchImageScreen = () => {
    const { caller } = useNotify();
    const { createProduct } = useProductCreate();
    const { params } = useRoute();
    const {
        title,
        description,
        price,
        foodType,
        openDays,
        adminDatabase,
    }: any = params;
    const [imgData, setImgData] = useState<any>(null)
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const MAX_SELECTION = 6
    const fetchData = async () => {
        try {
            setLoading(true)
            const image = await FetchImageModule()
            setImgData(image)
        } catch (error) {
            caller({
                message: 'Image Loading',
                description: 'CFailed to load images from gallery',
                type: 'danger',
            });
        } finally {
            setLoading(false)
        }
    }

    const toggleImageSelection = (imageUri: string) => {
        if (selectedImages.includes(imageUri)) {
            setSelectedImages(prev => prev.filter(uri => uri !== imageUri))
        } else {
            if (selectedImages.length >= MAX_SELECTION) {
                caller({
                    message: 'Maximum Reached',
                    description: `You can only select up to ${MAX_SELECTION} images`,
                    type: 'danger',
                });
                return
            }
            setSelectedImages(prev => [...prev, imageUri])
        }
    }
    const handleProceed = async () => {
        if (selectedImages.length !== 6) {
            caller({
                message: 'Invalid Selection',
                description: 'Please select exactly 6 images to continue.',
                type: 'danger',
            });
            return;
        }
        const mainImage = selectedImages[0];
        const menuImages = selectedImages.slice(1, 6);
        await createProduct({
            title,
            description,
            price,
            foodType,
            openDays,
            mainImage: mainImage,
            menuImages: menuImages,
            adminDatabase,
            setLoading,

        });


    }

    const clearSelection = () => {
        setSelectedImages([])
    }

    const removeSelectedImage = (imageUri: string) => {
        setSelectedImages(prev => prev.filter(uri => uri !== imageUri))
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <View className='flex-1 bg-white justify-center items-center'>
                <View className='items-center'>
                    <PhotoIcon size={48} color="#FF7622" />
                    <Text className='text-xl font-bold text-gray-800 mt-4'>Loading Gallery</Text>
                    <Text className='text-gray-500 mt-2'>Fetching your images...</Text>
                    <ActivityIndicator size="large" color="#FF7622" className='mt-6' />
                </View>
            </View>
        )
    }

    return (
        <View className='flex-1 bg-white'>
            <View className='bg-white  pb-4 px-4 border-b border-gray-100'>
                <PageNavigation route={"Select Images"} />
            </View>
            <View className='bg-gray-50 border-b border-gray-200 px-4 py-3'>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row items-center'>
                        <Text className='text-gray-800 font-semibold'>
                            Select Images ({selectedImages.length}/{MAX_SELECTION})
                        </Text>
                        {selectedImages.length > 0 && (
                            <TouchableOpacity activeOpacity={0.9} onPress={clearSelection} className='ml-3'>
                                <Text className='text-orange-500 text-sm font-medium'>Clear All</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    {selectedImages.length === MAX_SELECTION && (
                        <View className='flex-row items-center'>
                            <ExclamationTriangleIcon size={16} color="#EA580C" />
                            <Text className='text-orange-600 text-sm font-medium ml-1'>Max Reached</Text>
                        </View>
                    )}
                </View>
            </View>

            {selectedImages.length > 0 && (
                <View className='bg-orange-50 border-b border-orange-200 px-4 py-3'>
                    <Text className='text-orange-800 text-sm font-medium mb-2'>Selected Images:</Text>
                    <FlatList
                        horizontal
                        data={selectedImages}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={0.9} onPress={() => removeSelectedImage(item)}
                                className='relative mr-3'>
                                <Image
                                    source={{ uri: item }}
                                    className='w-24 h-24 rounded-lg'
                                    resizeMode="cover"
                                />
                                <View className='absolute top-1 left-1 bg-orange-500 rounded-full w-5 h-5 items-center justify-center'>
                                    <Text className='text-white text-xs font-bold'>{index + 1}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
            <View className='flex-1'>
                {imgData && imgData.length > 0 ? (
                    <>
                        <FlatList
                            data={imgData}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ padding: 8 }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity activeOpacity={0.9}
                                    onPress={() => toggleImageSelection(item)}
                                    disabled={selectedImages.length >= MAX_SELECTION && !selectedImages.includes(item)}
                                    className={`m-1 ${selectedImages.length >= MAX_SELECTION && !selectedImages.includes(item) ? 'opacity-60' : 'opacity-100'}`}
                                    style={{
                                        width: '32%',
                                        aspectRatio: 1,
                                    }}
                                >
                                    <View className='relative w-full h-full'>
                                        <Image
                                            source={{ uri: item }}
                                            className='w-full h-full rounded-lg'
                                            resizeMode="cover"
                                        />

                                        {/* Selection Overlay */}
                                        {selectedImages.includes(item) && (
                                            <View className='absolute inset-0 bg-orange-500/30 rounded-lg border-2 border-orange-500 justify-center items-center'>
                                                <CheckCircleIcon size={24} color="white" />
                                            </View>
                                        )}

                                        {selectedImages.includes(item) && (
                                            <View className='absolute top-2 right-2 bg-orange-500 rounded-full w-6 h-6 items-center justify-center'>
                                                <Text className="text-white text-xs font-bold">
                                                    {selectedImages.indexOf(item) + 1}
                                                </Text>
                                            </View>
                                        )}
                                        {selectedImages.length >= MAX_SELECTION && !selectedImages.includes(item) && (
                                            <View className='absolute inset-0 bg-gray-800/50 rounded-lg justify-center items-center'>
                                                <Text className="text-white text-xs font-bold text-center">
                                                    Max {MAX_SELECTION}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            )}
                            ListHeaderComponent={
                                <View className='px-2 py-4'>
                                    <Text className='text-lg font-bold text-gray-900'>Your Gallery</Text>
                                    <Text className='text-gray-500 text-sm mt-1'>
                                        Select up to {MAX_SELECTION} images for your tiffin service
                                    </Text>
                                </View>
                            }
                            ListEmptyComponent={
                                <View className='flex-1 justify-center items-center py-10'>
                                    <PhotoIcon size={48} color="#D1D5DB" />
                                    <Text className='text-gray-500 mt-3 text-center'>
                                        No images found in your gallery
                                    </Text>
                                </View>
                            }
                        />
                    </>
                ) : (
                    <View className='flex-1 justify-center items-center px-8'>
                        <PhotoIcon size={64} color="#D1D5DB" />
                        <Text className='text-xl font-bold text-gray-500 mt-4 text-center'>
                            No Images Found
                        </Text>
                        <Text className='text-gray-400 text-center mt-2 leading-5'>
                            We couldn't find any images in your gallery.
                        </Text>
                        <TouchableOpacity activeOpacity={0.9}
                            onPress={fetchData}
                            className='bg-orange-500 rounded-xl px-6 py-3 mt-6'
                        >
                            <Text className='text-white font-medium'>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <View className='bg-white border-t border-gray-200 px-4 py-4'>
                <View className='flex-row justify-between items-center mb-2'>
                    <Text className='text-gray-600 text-sm'>
                        {selectedImages.length} of {MAX_SELECTION} selected
                    </Text>
                    <View className='flex-row items-center'>
                        <View className={`w-2 h-2 rounded-full ${selectedImages.length > 0 ? 'bg-green-500' : 'bg-gray-300'} mr-1`} />
                        <Text className='text-gray-600 text-sm'>
                            {selectedImages.length > 0 ? 'Ready to proceed' : 'Select images to continue'}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.9}
                    onPress={handleProceed}
                    disabled={selectedImages.length === 0}
                    className={`rounded-xl py-4 px-6 flex-row justify-between items-center ${selectedImages.length === 0
                        ? 'bg-gray-200'
                        : 'bg-orange-500'
                        }`}
                >
                    <View className='flex-row items-center'>
                        <Text className={`text-lg font-bold ${selectedImages.length === 0 ? 'text-gray-500' : 'text-white'
                            }`}>
                            {selectedImages.length === 0
                                ? 'Select Images'
                                : `Continue with ${selectedImages.length} Image${selectedImages.length !== 1 ? 's' : ''}`
                            }
                        </Text>
                    </View>
                    <ChevronRightIcon
                        size={20}
                        color={selectedImages.length === 0 ? '#9CA3AF' : 'white'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FetchImageScreen
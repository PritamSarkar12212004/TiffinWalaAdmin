import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Icon from '../../MainLogo/icon/Icon';
import SingleImgPicker from '../../functions/image/SingleImgPicker';
import useProductCreate from '../../hooks/useProductCreate';
import UploaderWraper from '../../layout/error/UploaderWraper';
import { userContext } from '../../util/context/ContextProvider';

const UploadProduct = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const [foodType, setFoodType] = useState<string[]>([]);
  const [openDays, setOpenDays] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<any>(null);
  const [menuImages, setMenuImages] = useState<any[]>(Array(6).fill(null));
  const { createProduct } = useProductCreate()
  const CreateProfileFunc = () => {
    createProduct({
      title,
      description,
      price,
      foodType,
      openDays,
      mainImage,
      menuImages,
    })
  }

  const foodTypeData = [
    { id: 1, name: 'Veg', icon: 'leaf', color: 'green' },
    { id: 2, name: 'Non-Veg', icon: 'drumstick-bite', color: 'red' },
    { id: 3, name: 'Vegan', icon: 'apple-whole', color: 'orange' },
  ];

  const openDaysData = [
    { id: 1, name: 'Monday', color: 'red' },
    { id: 2, name: 'Tuesday', color: 'orange' },
    { id: 3, name: 'Wednesday', color: 'green' },
    { id: 4, name: 'Thursday', color: 'red' },
    { id: 5, name: 'Friday', color: 'orange' },
    { id: 6, name: 'Saturday', color: 'green' },
    { id: 7, name: 'Sunday', color: 'red' },
  ];

  const daySelector = (day: string) => {
    setOpenDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const foodSelector = (type: string) => {
    setFoodType(prev =>
      prev.includes(type) ? prev.filter(f => f !== type) : [...prev, type]
    );
  };

  const pickMainImage = () => {
    SingleImgPicker({ setMainImage });
  };

  const pickMenuImage = (index: number) => {
    SingleImgPicker({
      setMainImage: (uri: string) => {
        const newImages = [...menuImages];
        newImages[index] = uri;
        setMenuImages(newImages);
      },
    });
  };

  return (
    <UploaderWraper>
      <ScrollView showsHorizontalScrollIndicator={false} className='flex-1 bg-[#F3F3F3]'>
        <View className='flex-1 px-4 gap-4 mb-40 bg-[#F3F3F3]'>

          {/* Item Name */}
          <View className='w-full flex gap-2'>
            <Text className='text-xl font-semibold tracking-widest'>ITEM NAME</Text>
            <TextInput
              onChangeText={(title) => setTitle(title)}
              value={title}
              placeholder='Mess / Tiffin Name'
              className='w-full h-16 border-2 border-gray-200 rounded-xl px-3 bg-[#E8EAED] text-gray-600 placeholder:text-gray-600'
            />
          </View>

          {/* Description */}
          <View className='w-full flex gap-2'>
            <Text className='text-xl font-semibold tracking-widest'>Description</Text>
            <TextInput
              onChangeText={(description) => setDescription(description)}
              value={description}
              multiline
              numberOfLines={4}
              placeholder='Write something about the Mess / Tiffin service...'
              textAlignVertical='top'
              className='w-full h-32 border-2 border-gray-200 rounded-xl px-3 py-2 bg-[#E8EAED] text-gray-600 placeholder:text-gray-600'
            />
          </View>

          {/* Main Image */}
          <View className='w-full flex gap-2'>
            <Text className='text-lg font-semibold tracking-widest'>UPLOAD MESS PHOTO</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickMainImage}
              className='w-full h-56 gap-3 rounded-3xl border-dashed border-zinc-400 border-2 bg-[#E8EAED] flex items-center justify-center'
            >
              {mainImage ? (
                <Image source={{ uri: mainImage }} className='w-full h-full rounded-3xl' resizeMode='cover' />
              ) : (
                <View className='flex items-center justify-center'>
                  <View className='p-7 rounded-full bg-zinc-200'>
                    <Icon name='upload' size={24} color='#523BB1' type='solid' />
                  </View>
                  <Text className='text-center text-gray-600 font-semibold'>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Menu Images */}
          <View className='w-full flex gap-2'>
            <Text className='text-lg font-semibold tracking-widest'>UPLOAD MENU PHOTO</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex flex-row gap-3'>
                {menuImages.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => pickMenuImage(index)}
                    activeOpacity={0.8}
                    className='w-56 h-56 gap-3 rounded-3xl border-dashed border-zinc-400 border-2 bg-[#E8EAED] flex items-center justify-center'
                  >
                    {img ? (
                      <Image source={{ uri: img }} className='w-full h-full rounded-3xl' resizeMode='cover' />
                    ) : (
                      <View className='flex items-center justify-center'>
                        <View className='p-7 rounded-full bg-zinc-200'>
                          <Icon name='upload' size={24} color='#523BB1' type='solid' />
                        </View>
                        <Text className='text-center text-gray-600 font-semibold'>Add Photo</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Price */}
          <View className='flex w-full gap-1'>
            <Text className='text-xl tracking-widest'>Price</Text>
            <TextInput
              onChangeText={(price) => setPrice(price)}
              value={price}

              placeholder='₹ 0000'
              keyboardType='number-pad'
              className='w-36 h-16 border-2 border-gray-200 rounded-xl text-lg font-bold px-3 bg-[#E8EAED] text-gray-600 placeholder:text-gray-600'
            />
          </View>

          {/* Food Type */}
          <View className='flex w-full gap-1'>
            <Text className='text-xl tracking-widest'>Food Type</Text>
            <View className='w-full flex flex-row gap-4'>
              {foodTypeData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.8}
                  onPress={() => foodSelector(item.name)}
                  className={`w-[30%] flex flex-row items-center justify-between px-3 h-12 ${foodType.includes(item.name)
                    ? 'bg-[#FFEBE4] border-[#FB6D3A] border-[1px] rounded-2xl'
                    : 'border-[#9C9BA6] border-[1px] rounded-2xl'
                    }`}
                >
                  <Text className='font-bold text-gray-700'>
                    <Icon color={item.color} size={16} name={item.icon} type='solid' /> {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Open Days */}
          <View className='flex w-full gap-1'>
            <Text className='text-xl tracking-widest'>Mess Open Days</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className='w-full'>
              <View className='flex flex-row gap-4'>
                {openDaysData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => daySelector(item.name)}
                    className={`px-3 flex flex-row items-center justify-between h-12 mb-2 ${openDays.includes(item.name)
                      ? 'bg-[#FFEBE4] border-[#FB6D3A] border-[1px] rounded-2xl'
                      : 'border-[#9C9BA6] border-[1px] rounded-2xl'
                      }`}
                  >
                    <Icon color={item.color} size={16} name='calendar' type='solid' />
                    <Text className='font-bold text-gray-700 ml-2'>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Upload Button */}
          <View className='flex w-full gap-1 mt-8'>
            <TouchableOpacity onPress={() => CreateProfileFunc()} activeOpacity={0.8} className='w-full h-16 bg-[#FF7622] rounded-2xl flex items-center justify-center flex-row gap-3'>
              <Icon color='white' size={16} name='upload' type='solid' />
              <Text className='text-white font-bold text-lg'>Upload Mess Services</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </UploaderWraper>
  );
};

export default UploadProduct;

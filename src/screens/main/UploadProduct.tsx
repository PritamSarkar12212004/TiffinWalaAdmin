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
import SectionCard from '../../components/elements/SectionCard';
import ImagePickerCard from '../../components/elements/ImagePickerCard';
import PillToggle from '../../components/elements/PillToggle';
import GradientButton from '../../components/elements/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const UploadProduct = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState<string[]>([]);
  const [openDays, setOpenDays] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<any>(null);
  const [menuImages, setMenuImages] = useState<any[]>(Array(6).fill(null));
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProductCreate();

  const CreateProfileFunc = async () => {
    setLoading(true);
    await createProduct({
      title,
      description,
      price,
      foodType,
      openDays,
      mainImage,
      menuImages,
    });
    setLoading(false);
  };

  const foodTypeData = [
    { id: 1, name: 'Veg', icon: 'leaf', color: '#22c55e' },
    { id: 2, name: 'Non-Veg', icon: 'drumstick-bite', color: '#ef4444' },
    { id: 3, name: 'Vegan', icon: 'apple-whole', color: '#f59e42' },
  ];

  const openDaysData = [
    { id: 1, name: 'Monday', color: '#ef4444' },
    { id: 2, name: 'Tuesday', color: '#f59e42' },
    { id: 3, name: 'Wednesday', color: '#22c55e' },
    { id: 4, name: 'Thursday', color: '#ef4444' },
    { id: 5, name: 'Friday', color: '#f59e42' },
    { id: 6, name: 'Saturday', color: '#22c55e' },
    { id: 7, name: 'Sunday', color: '#ef4444' },
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

  const removeMenuImage = (index: number) => {
    const newImages = [...menuImages];
    newImages[index] = null;
    setMenuImages(newImages);
  };

  return (
    <UploaderWraper isVisible={false}>
      <ScrollView showsHorizontalScrollIndicator={false} className='flex-1 bg-[#F3F3F3]'>
        <View className='flex-1 px-4 gap-4 mb-40 bg-[#F3F3F3]'>
          {/* Item Name */}
          <SectionCard title='Item Name'>
            <TextInput
              onChangeText={setTitle}
              value={title}
              placeholder='Mess / Tiffin Name'
              className='w-full h-14 border-2 border-gray-200 rounded-xl px-3 bg-[#E8EAED] text-gray-600 placeholder:text-gray-600 text-base'
            />
          </SectionCard>

          {/* Description */}
          <SectionCard title='Description'>
            <TextInput
              onChangeText={setDescription}
              value={description}
              multiline
              numberOfLines={4}
              placeholder='Write something about the Mess / Tiffin service...'
              textAlignVertical='top'
              className='w-full h-28 border-2 border-gray-200 rounded-xl px-3 py-2 bg-[#E8EAED] text-gray-600 placeholder:text-gray-600 text-base'
            />
          </SectionCard>

          {/* Main Image */}
          <SectionCard title='Upload Mess Photo'>
            <ImagePickerCard
              image={mainImage}
              onPress={pickMainImage}
              label='Add Photo'
            />
          </SectionCard>

          {/* Menu Images */}
          <SectionCard title='Upload Menu Photos'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className='flex flex-row gap-3'>
                {menuImages.map((img, index) => (
                  <ImagePickerCard
                    key={index}
                    image={img}
                    onPress={() => pickMenuImage(index)}
                    label='Add Photo'
                    removable={!!img}
                    onRemove={() => removeMenuImage(index)}
                  />
                ))}
              </View>
            </ScrollView>
          </SectionCard>

          {/* Price */}
          <SectionCard title='Price'>
            <TextInput
              onChangeText={setPrice}
              value={price}
              placeholder='₹ 0000'
              keyboardType='number-pad'
              className='w-36 h-14 border-2 border-gray-200 rounded-xl text-lg font-bold px-3 bg-[#E8EAED] text-gray-600 placeholder:text-gray-600'
            />
          </SectionCard>

          {/* Food Type */}
          <SectionCard title='Food Type'>
            <View className='w-full flex flex-row flex-wrap gap-2'>
              {foodTypeData.map((item, index) => (
                <PillToggle
                  key={index}
                  label={item.name}
                  icon={item.icon}
                  selected={foodType.includes(item.name)}
                  color={item.color}
                  onPress={() => foodSelector(item.name)}
                />
              ))}
            </View>
          </SectionCard>

          {/* Open Days */}
          <SectionCard title='Mess Open Days'>
            <View className='w-full flex flex-row flex-wrap gap-2'>
              {openDaysData.map((item, index) => (
                <PillToggle
                  key={index}
                  label={item.name}
                  icon='calendar'
                  selected={openDays.includes(item.name)}
                  color={item.color}
                  onPress={() => daySelector(item.name)}
                />
              ))}
            </View>
          </SectionCard>

          {/* Upload Button */}
          <View className='flex w-full gap-1 mt-4 mb-8'>
            <GradientButton
              onPress={CreateProfileFunc}
              title={loading ? 'Uploading...' : 'Upload Mess Services'}
              icon='upload'
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </UploaderWraper>
  );
};

export default UploadProduct;

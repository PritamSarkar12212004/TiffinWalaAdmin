import {
  View,
  TextInput,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import UploaderWraper from '../../layout/error/UploaderWraper';
import { userContext } from '../../util/context/ContextProvider';
import Animation from '../../constant/animation/Animation';
import AnimationComp from '../../components/elements/AnimationComp';
import { foodTypeData, openDaysData } from '../../demo/data/UploadProductData';
import UploadingModel from '../../components/modal/Upload/UploadingModel';
import UploaddingErrorModal from '../../components/modal/Upload/UploaddingErrorModal';
import ValidationErrorModal from '../../components/modal/Upload/ValidationErrorModal';
import SuccessFullModel from '../../components/modal/Upload/SuccessFullModel';
import {
  CalendarIcon,
  TagIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  CurrencyRupeeIcon
} from 'react-native-heroicons/solid';
import PageNavigation from '../../layout/navigation/PageNavigation';

const UploadProduct = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState<string[]>([]);
  const [openDays, setOpenDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { adminDatabase } = userContext();
  const [uploadStatus, setUploadStatus] = useState<string | any>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState(0);

  const CreateProfileFunc = async () => {
    if (!validateFields()) {
      setLoading(true);
      setUploadStatus('validation');
      return;
    }
    const payload = await {
      title,
      description,
      price,
      foodType,
      openDays,
      adminDatabase,
    }
    navigation.navigate({
      name: 'page',
      params: {
        screen: 'FetchImageScreen',
        params: payload
      },
    } as never);


  };

  const fildReseter = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setFoodType([]);
    setOpenDays([]);
    setCharacterCount(0);
  };


  const validateFields = (): boolean => {
    const errors: string[] = [];

    if (!title.trim()) {
      errors.push('Tiffin service name is required');
    } else if (title.length < 3) {
      errors.push('Name must be at least 3 characters long');
    }
    if (!description.trim()) {
      errors.push('Description is required');
    } else if (description.length < 20) {
      errors.push('Description must be at least 20 characters long');
    } else if (description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }

    if (!price) {
      errors.push('Price is required');
    } else {
      const priceNum = Number(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        errors.push('Price must be a valid number greater than 0');
      }
    }

    if (foodType.length === 0) {
      errors.push('Please select at least one food type');
    }

    if (openDays.length === 0) {
      errors.push('Please select at least one open day');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    setCharacterCount(text.length);
  };

  const daySelector = (day: string) => {
    setOpenDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const foodSelector = (type: string) => {
    if (foodType.includes(type)) {
      setFoodType(prev => prev.filter(f => f !== type));
    } else if (foodType.length < 3) {
      setFoodType(prev => [...prev, type]);
    }
  };

  const CharacterCounter = () => (
    <View className="flex-row justify-between items-center mt-2">
      <Text className={`text-xs ${characterCount > 500 ? 'text-red-500' : characterCount < 20 ? 'text-amber-500' : 'text-green-500'}`}>
        {characterCount}/500 characters
      </Text>
      {characterCount >= 20 && characterCount <= 500 ? (
        <CheckCircleIcon size={16} color="#10B981" />
      ) : characterCount > 500 ? (
        <XCircleIcon size={16} color="#EF4444" />
      ) : null}
    </View>
  );

  useEffect(() => {
    return () => {
      setUploadStatus(null);
      setLoading(false);
    };
  }, []);

  return (
    <UploaderWraper isVisible={loading}>
      <Modal visible={loading} transparent animationType="fade">
        {uploadStatus === 'uploading' ? (
          <UploadingModel AnimationComp={AnimationComp} Animation={Animation} />
        ) : uploadStatus === 'error' ? (
          <UploaddingErrorModal
            AnimationComp={AnimationComp}
            Animation={Animation}
            setIsError={setUploadStatus}
            setLoading={setLoading}
            fildReseter={fildReseter}
            CreateProfileFunc={CreateProfileFunc}
          />
        ) : uploadStatus === 'validation' ? (
          <ValidationErrorModal
            errors={validationErrors}
            onClose={() => {
              setUploadStatus(null);
              setLoading(false);
            }}
            AnimationComp={AnimationComp}
            Animation={Animation}
          />
        ) : uploadStatus === 'success' ? (
          <SuccessFullModel
            AnimationComp={AnimationComp}
            Animation={Animation}
            setUploadStatus={setUploadStatus}
            setloader={setLoading}
            fildReseter={fildReseter}
          />
        ) : null}
      </Modal>

      <View className='flex-1 bg-gray-50'>
        <View className='bg-white  pb-4 px-4 border-b border-gray-100'>
          <PageNavigation route={"Add Tiffin Service"} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className='flex-1'
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View className='px-3 pt-6 gap-5'>
            <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-3">
                  <TagIcon size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Service Name</Text>
                  <Text className="text-gray-500 text-sm">Name of your tiffin service</Text>
                </View>
              </View>
              <TextInput
                onChangeText={setTitle}
                value={title}
                placeholder="e.g., Spicy Kitchen, Home Style Meals"
                className='w-full h-14 bg-gray-50 rounded-xl px-4 text-gray-800 text-base border-2 border-gray-200'
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-green-50 rounded-xl items-center justify-center mr-3">
                  <DocumentTextIcon size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Description</Text>
                  <Text className="text-gray-500 text-sm">Tell us about your service</Text>
                </View>
              </View>
              <View>
                <TextInput
                  onChangeText={handleDescriptionChange}
                  value={description}
                  multiline
                  numberOfLines={4}
                  placeholder="Describe your tiffin service, special dishes, cooking style, ingredients quality, etc..."
                  textAlignVertical='top'
                  className='w-full min-h-[100px] bg-gray-50 rounded-xl px-4 py-3 text-gray-800 text-base border-2 border-gray-200'
                  placeholderTextColor="#9CA3AF"
                  maxLength={500}
                />
                <CharacterCounter />
              </View>
            </View>
            <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center mr-3">
                  <CurrencyRupeeIcon size={20} color="#8B5CF6" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Monthly Price</Text>
                  <Text className="text-gray-500 text-sm">Set your monthly subscription price</Text>
                </View>
              </View>
              <View className="relative">
                <TextInput
                  onChangeText={setPrice}
                  value={price}
                  placeholder="0.00"
                  keyboardType='decimal-pad'
                  className='w-full h-14 bg-gray-50 rounded-xl px-12 text-gray-800 placeholder:text-gray-800 text-lg font-semibold border-2 border-gray-200'
                />
                <View className="absolute left-4 top-0 h-14 flex-row items-center">
                  <Text className="text-gray-500 text-lg font-semibold">₹</Text>
                </View>
                <View className="absolute right-4 top-0 h-14 flex-row items-center">
                  <Text className="text-gray-400 text-sm">per month</Text>
                </View>
              </View>
            </View>
            <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-orange-50 rounded-xl items-center justify-center mr-3">
                  <Text className="text-orange-600 text-lg">🍛</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Food Type</Text>
                  <Text className="text-gray-500 text-sm">Select the types of food you serve (max 3)</Text>
                </View>
              </View>
              <View className='flex-row flex-wrap gap-2'>
                {foodTypeData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => foodSelector(item.name)}
                    disabled={!foodType.includes(item.name) && foodType.length >= 3}
                    className={`px-4 py-3 rounded-xl border-2 gap-2 flex-row items-center ${foodType.includes(item.name)
                      ? 'bg-orange-50 border-orange-500'
                      : foodType.length >= 3
                        ? 'bg-gray-100 border-gray-300 opacity-60'
                        : 'bg-gray-50 border-gray-200'
                      }`}
                  >
                    <Text className={`text-sm font-medium ${foodType.includes(item.name) ? 'text-orange-700' : 'text-gray-700'
                      }`}>
                      {item.name}
                    </Text>
                    {foodType.includes(item.name) && (
                      <CheckCircleIcon size={16} color="#EA580C" className="ml-2" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-gray-400 text-xs mt-3 text-center">
                {foodType.length}/3 selected
              </Text>
            </View>
            <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <View className="flex-row items-center mb-4">
                <View className="w-10 h-10 bg-indigo-50 rounded-xl items-center justify-center mr-3">
                  <CalendarIcon size={20} color="#6366F1" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Service Days</Text>
                  <Text className="text-gray-500 text-sm">Select days you provide service</Text>
                </View>
              </View>
              <View className='flex-row flex-wrap gap-2'>
                {openDaysData.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => daySelector(item.name)}
                    className={`px-4 py-3 rounded-xl border-2 flex-1 min-w-[30%] items-center ${openDays.includes(item.name)
                      ? 'bg-indigo-50 border-indigo-500'
                      : 'bg-gray-50 border-gray-200'
                      }`}
                  >
                    <Text className={`text-sm font-medium text-center ${openDays.includes(item.name) ? 'text-indigo-700' : 'text-gray-700'
                      }`}>
                      {item.name}
                    </Text>
                    {openDays.includes(item.name) && (
                      <CheckCircleIcon size={14} color="#6366F1" className="mt-1" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <Text className="text-gray-400 text-xs mt-3 text-center">
                {openDays.length} days selected
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={CreateProfileFunc}
              disabled={loading}
              className={`bg-orange-500 rounded-2xl py-4 px-6 shadow-lg shadow-orange-200 mt-2 ${loading ? 'opacity-70' : ''
                }`}
            >
              <View className="flex-row items-center justify-center">
                <Text className="text-white font-bold text-lg ml-2">Next</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </UploaderWraper>
  );
};

export default UploadProduct;
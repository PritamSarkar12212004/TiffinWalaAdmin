import {
  View,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SingleImgPicker from '../../functions/image/SingleImgPicker';
import useProductCreate from '../../hooks/useProductCreate';
import UploaderWraper from '../../layout/error/UploaderWraper';
import SectionCard from '../../components/elements/SectionCard';
import ImagePickerCard from '../../components/elements/ImagePickerCard';
import PillToggle from '../../components/elements/PillToggle';
import GradientButton from '../../components/elements/GradientButton';
import { userContext } from '../../util/context/ContextProvider';
import Animation from '../../constant/animation/Animation';
import AnimationComp from '../../components/elements/AnimationComp';
import { foodTypeData, openDaysData } from '../../demo/data/UploadProductData';
import UploadingModel from '../../components/modal/Upload/UploadingModel';
import UploaddingErrorModal from '../../components/modal/Upload/UploaddingErrorModal';
import ValidationErrorModal from '../../components/modal/Upload/ValidationErrorModal';

const UploadProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [foodType, setFoodType] = useState<string[]>([]);
  const [openDays, setOpenDays] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<any>(null);
  const [menuImages, setMenuImages] = useState<any[]>(Array(6).fill(null));
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProductCreate();
  const { adminDatabase } = userContext()
  const [uploadStatus, setUploadStatus] = useState<string | any>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const CreateProfileFunc = async () => {
    if (!validateFields()) {
      setLoading(true);
      setUploadStatus('validation')
      return;
    }
    setLoading(true);
    setUploadStatus('uploading')
    await createProduct({
      title,
      description,
      price,
      foodType,
      openDays,
      mainImage,
      menuImages,
      adminDatabase,
      setLoading,
      fildReseter,
      errorHandler,
      setUploadStatus
    });
  };
  const fildReseter = () => {
    setTitle('')
    setDescription('')
    setPrice('')
    setFoodType([])
    setOpenDays([])
    setMainImage(null)
    setMenuImages(Array(6).fill(null))
  }
  const errorHandler = (status: any) => {
    fildReseter()
    setUploadStatus(status)
  }
  const validateFields = (): boolean => {
    const errors: string[] = [];

    // Title validation
    if (!title.trim()) {
      errors.push('Mess/Tiffin name is required');
    } else if (title.length < 3) {
      errors.push('Name must be at least 3 characters long');
    } else if (title.length > 50) {
      errors.push('Name must be less than 50 characters');
    }

    // Description validation
    if (!description.trim()) {
      errors.push('Description is required');
    } else if (description.length < 20) {
      errors.push('Description must be at least 20 characters long');
    } else if (description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }

    // Price validation
    if (!price) {
      errors.push('Price is required');
    } else {
      const priceNum = Number(price);
      if (isNaN(priceNum)) {
        errors.push('Price must be a valid number');
      } else if (priceNum <= 0) {
        errors.push('Price must be greater than 0');
      } else if (priceNum > 100000) {
        errors.push('Price must be less than ₹100,000');
      }
    }

    // Main image validation
    if (!mainImage) {
      errors.push('Main photo is required');
    }

    // Menu images validation - Require exactly 6 images
    const filledMenuImages = menuImages.filter(img => img !== null);
    if (filledMenuImages.length === 0) {
      errors.push('Menu photos are required');
    } else if (filledMenuImages.length < 6) {
      const remaining = 6 - filledMenuImages.length;
      errors.push(`Please upload ${remaining} more menu photo${remaining > 1 ? 's' : ''}. (${filledMenuImages.length}/6 uploaded)`);
    }

    // Food type validation
    if (foodType.length === 0) {
      errors.push('Please select at least one food type');
    } else if (foodType.length > 3) {
      errors.push('Maximum 3 food types can be selected');
    }

    // Open days validation
    if (openDays.length === 0) {
      errors.push('Please select at least one open day');
    } else if (openDays.length > 7) {
      errors.push('Invalid number of open days selected');
    }

    // Set validation errors and return result
    setValidationErrors(errors);
    return errors.length === 0;
  };
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
  useEffect(() => {

  }, [uploadStatus])


  return (
    <UploaderWraper isVisible={loading}>
      <Modal
        visible={loading}
        transparent
        animationType="fade"
      >
        {uploadStatus ? uploadStatus === 'uploading' ? (
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
        ) : null : null}
      </Modal>

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

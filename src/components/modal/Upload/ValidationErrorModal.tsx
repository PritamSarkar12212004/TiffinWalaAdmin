import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { Fragment } from 'react';

const ValidationErrorModal = ({
  errors = [],
  onClose,
  AnimationComp,
  Animation,
}: {
  errors: string[];
  onClose: () => void;
  AnimationComp?: any;
  Animation?: any;
}) => {
  return (
    <Fragment>
      {/* Background Blur */}
      <View className="absolute inset-0">
        <View className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
      </View>

      {/* Modal Content */}
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl max-h-[85%]">
          {/* Optional Animation */}
          {AnimationComp && Animation?.ValidationError && (
            <View className="items-center mb-4">
              <AnimationComp
                path={Animation.UploadingError}
                height={120}
                width={120}
              />
            </View>
          )}

          {/* Title */}
          <Text className="text-xl font-bold text-red-600 text-center">
            Validation Error
          </Text>

          {/* Subheading */}
          <Text className="text-base text-gray-700 text-center mt-2">
            Please fix the following issues before uploading:
          </Text>

          {/* Error List */}
          <ScrollView className="max-h-60 mt-4 space-y-2">
            {errors.map((err, index) => (
              <View key={index} className="flex-row items-start gap-2">
                <Text className="text-red-500 font-bold">•</Text>
                <Text className="text-sm text-gray-700">{err}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            className="mt-6 bg-red-600 py-3 rounded-xl"
            onPress={onClose}
          >
            <Text className="text-white text-center font-semibold">
              OK, Got It
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
};

export default ValidationErrorModal;

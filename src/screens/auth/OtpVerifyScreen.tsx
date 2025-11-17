import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';
import { useRoute, useNavigation } from '@react-navigation/native';
import { OtpInput } from "react-native-otp-entry";
import useVarifyOtpData from '../../hooks/api/Auth/useVarifyOtpData';
import { useNotify } from '../../components/wraper/Wraper';


const OtpVerifyScreen = () => {
  const navigation = useNavigation();
  const RouteParams = useRoute();
  const { caller } = useNotify();

  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navbigateOtp = RouteParams.params.otp;
  const { varifyOtpData } = useVarifyOtpData();


  const handleChangeNumber = () => {
    navigation.goBack();
  };

  const handleOpt = async (enteredOtp: string) => {
    setIsLoading(true);
    if (enteredOtp === navbigateOtp) {
      const status = true
      await varifyOtpData(status, RouteParams.params.phone, navigation)
    } else {
      caller({
        message: 'Invalid OTP',
        description: 'The OTP you entered is incorrect. Please try again.',
        type: 'danger',
      });
    }
    setIsLoading(false);
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 bg-white pt-10">
        <View className="flex-1 px-6">
          <View className="items-center mt-5">
            <View className="mb-6">
              <View className="w-20 h-20 rounded-2xl bg-green-50 justify-center items-center border-2 border-green-100">
                <Icon type="solid" name="lock" size={36} color="#10B981" />
              </View>
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2 text-center">
              OTP Verification
            </Text>
            <Text className="text-base text-gray-500 text-center font-medium mb-1">
              Enter the 4-digit code sent to
            </Text>
            <Text className="text-lg font-semibold text-green-600 mb-4">
              +91 {RouteParams.params.phone}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => isLoading ? null : handleChangeNumber()} className="mb-8">
              <Text className="text-blue-600 font-semibold text-base">
                Change Number
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full max-w-md self-center mt-20 flex">
            <OtpInput
              numberOfDigits={4}
              focusColor="#FF6B35"
              autoFocus={true}
              hideStick={false}
              placeholder={''}
              blurOnFilled={false}
              disabled={isLoading}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onTextChange={setOtp}
              onFilled={handleOpt}
              theme={{
                containerStyle: {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 32,
                },
                pinCodeContainerStyle: {
                  width: 70,
                  height: 70,
                  borderRadius: 16,
                  backgroundColor: '#F8FAFC',
                  borderWidth: 2,
                  borderColor: '#E2E8F0',
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.02,
                  shadowRadius: 8,
                  elevation: 2,
                },
                focusedPinCodeContainerStyle: {
                  borderColor: '#FF6B35',
                  backgroundColor: '#FFFFFF',
                  shadowColor: '#FF6B35',
                  shadowOpacity: 0.1,
                  elevation: 4,
                },
                filledPinCodeContainerStyle: {
                  borderColor: '#10B981',
                  backgroundColor: '#F0FDF4',
                },
                pinCodeTextStyle: {
                  fontSize: 24,
                  fontWeight: '700',
                  color: '#1E293B',
                },
                placeholderTextStyle: {
                  color: '#CBD5E1',
                  fontSize: 24,
                },
                disabledPinCodeContainerStyle: {
                  backgroundColor: '#F1F5F9',
                  borderColor: '#E2E8F0',
                },
              }}
            />
            <TouchableOpacity
              onPress={() => handleOpt(otp)}
              activeOpacity={0.9}
              disabled={otp.length !== 4 || isLoading}
              className={`
                rounded-2xl h-14 justify-center items-center
                ${otp.length !== 4 || isLoading ? 'bg-gray-300' : 'bg-orange-500 shadow-lg shadow-orange-500/25 elevation-8'}
              `}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Text className="text-base font-bold text-white mr-2">
                    Verify OTP
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerifyScreen;
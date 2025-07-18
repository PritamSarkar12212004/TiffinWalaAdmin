import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { OtpInput } from "react-native-otp-entry";
import useResendOtpApi from '../../hooks/api/Auth/useResendOtpApi';
import useVarifyOtpData from '../../hooks/api/Auth/useVarifyOtpData';
interface OtpVerifyScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const OtpVerifyScreen: React.FC<OtpVerifyScreenProps> = ({ navigation, route }) => {
  const RouteParams = useRoute();

  const { ResendApi } = useResendOtpApi()
  const [otp, setOtp] = useState<string>('');
  const [timer, setTimer] = useState(30);
  const [navbigateOtp, setNavigateOtp] = useState(RouteParams.params.otp)
  const { varifyOtpData } = useVarifyOtpData()

  const handleResend = () => {
    ResendApi(RouteParams.params.phone, setNavigateOtp, setTimer)
  };

  const handleChangeNumber = () => {
    navigation.goBack();
  };
  const handleOpt = (enteredOtp: string) => {
    if (enteredOtp === navbigateOtp) {
      const status = true
      varifyOtpData(status, RouteParams.params.phone,navigation)
    } else {
      console.log("login Error");
    }
  };

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* Soft Background */}
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Icon name="lock" size={54} type="solid" color="#10B981" />
          </View>
          <Text style={styles.title}>Verify OTP</Text>
          {/* <Text style={styles.subtitle}>Enter the 4-digit code sent to <Text style={styles.mobileText}>+91 {mobile}</Text></Text> */}
          <TouchableOpacity style={styles.changeNumberBtn} onPress={handleChangeNumber}>
            <Text style={styles.changeNumberText}>Change number</Text>
          </TouchableOpacity>
          {/* OTP Input */}
          <View style={styles.otpRow}>
            <OtpInput
              numberOfDigits={4}
              focusColor="#10B981"
              autoFocus={false}
              hideStick={true}
              placeholder={''}
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              onFilled={(text) => { setOtp(text); handleOpt(text); }}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              textProps={{
                accessibilityRole: "text",
                accessibilityLabel: "OTP digit",
                allowFontScaling: false,
              }}
              theme={{
                containerStyle: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 16,
                  marginBottom: 24,
                  marginTop: 8,
                },
                pinCodeContainerStyle: {
                  width: 54,
                  height: 62,
                  borderRadius: 14,
                  backgroundColor: '#F1F5F9',
                  borderWidth: 2,
                  borderColor: '#E2E8F0',
                  marginHorizontal: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                focusedPinCodeContainerStyle: {
                  borderColor: '#10B981',
                  backgroundColor: '#D1FAE5',
                },
                filledPinCodeContainerStyle: {
                  borderColor: '#10B981',
                  backgroundColor: '#D1FAE5',
                },
                pinCodeTextStyle: {
                  fontSize: 26,
                  fontWeight: '700',
                  color: '#1E293B',
                },
                placeholderTextStyle: {
                  color: '#CBD5E1',
                  fontSize: 26,
                },
                disabledPinCodeContainerStyle: {
                  backgroundColor: '#E5E7EB',
                  borderColor: '#CBD5E1',
                },
              }}
            />
          </View>
          <View style={styles.timerRow}>
            <Icon name="clock" size={16} type="solid" color="#6366F1" />
            <Text style={styles.timerText}>Resend OTP in <Text style={styles.timerValue}>{timer}s</Text></Text>
          </View>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0} style={[styles.resendBtn, timer > 0 && { opacity: 0.5 }]}>
            <Text style={styles.resendBtnText}>Resend OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOpt(otp)} activeOpacity={0.9} style={styles.submitBtn} className='w-full'>
            <Text style={styles.submitText}>Verify</Text>
          </TouchableOpacity>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>By verifying, you agree to our <Text style={styles.link}>Terms</Text> & <Text style={styles.link}>Privacy Policy</Text>.</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bgCircle1: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#6366F110',
    zIndex: 0,
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -100,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#10B98110',
    zIndex: 0,
  },
  content: {
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 1,
  },
  iconContainer: {
    backgroundColor: '#10B98115',
    borderRadius: 32,
    padding: 20,
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 8,
    textAlign: 'center',
  },
  mobileText: {
    color: '#10B981',
    fontWeight: '700',
  },
  changeNumberBtn: {
    marginBottom: 18,
    marginTop: 2,
  },
  changeNumberText: {
    color: '#6366F1',
    fontWeight: '700',
    fontSize: 14,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginBottom: 24,
    marginTop: 8,
  },
  otpInput: {
    width: 54,
    height: 62,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
    color: '#1E293B',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginHorizontal: 2,
  },
  otpInputFilled: {
    borderColor: '#10B981',
    backgroundColor: '#D1FAE5',
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  timerText: {
    color: '#64748B',
    fontSize: 14,
    marginLeft: 6,
  },
  timerValue: {
    color: '#10B981',
    fontWeight: '700',
  },
  resendBtn: {
    marginBottom: 18,
    marginTop: 2,
    alignItems: 'center',
  },
  resendBtnText: {
    color: '#6366F1',
    fontWeight: '700',
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  submitText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 24,
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
  },
  link: {
    color: '#6366F1',
    fontWeight: '700',
  },
});

export default OtpVerifyScreen; 
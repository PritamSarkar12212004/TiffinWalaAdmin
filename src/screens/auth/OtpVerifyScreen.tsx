import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface OtpVerifyScreenProps {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const OtpVerifyScreen: React.FC<OtpVerifyScreenProps> = ({ navigation, route }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];
  const mobile = route?.params?.mobile || '';

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text: string, idx: number) => {
    if (/^[0-9]?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);
      if (text && idx < 3 && inputRefs[idx + 1].current) {
        inputRefs[idx + 1].current!.focus();
      }
      if (!text && idx > 0 && inputRefs[idx - 1].current) {
        inputRefs[idx - 1].current!.focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(30);
    // trigger resend OTP logic here
  };

  const handleChangeNumber = () => {
    navigation.goBack();
  };

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
          <Text style={styles.subtitle}>Enter the 4-digit code sent to <Text style={styles.mobileText}>+91 {mobile}</Text></Text>
          <TouchableOpacity style={styles.changeNumberBtn} onPress={handleChangeNumber}>
            <Text style={styles.changeNumberText}>Change number</Text>
          </TouchableOpacity>
          <View style={styles.otpRow}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={inputRefs[idx]}
                style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={text => handleChange(text, idx)}
                autoFocus={idx === 0}
                returnKeyType="next"
                selectionColor="#10B981"
              />
            ))}
          </View>
          <View style={styles.timerRow}>
            <Icon name="clock" size={16} type="solid" color="#6366F1" />
            <Text style={styles.timerText}>Resend OTP in <Text style={styles.timerValue}>{timer}s</Text></Text>
          </View>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0} style={[styles.resendBtn, timer > 0 && { opacity: 0.5 }]}>
            <Text style={styles.resendBtnText}>Resend OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} style={styles.submitBtn} className='w-full'>
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
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';
import { StackNavigationProp } from '@react-navigation/stack';
import useLoginApi from '../../hooks/api/Auth/useLoginApi';
import { useNavigation } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: StackNavigationProp<any, any>;
}
const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { login } = useLoginApi()
  const Routenavigation = useNavigation()
  const [mobile, setMobile] = useState('');
  const [loading, setloading] = useState(false)

  const inputValidation = (text: any) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 10) {
      setMobile(cleaned);
    }
  }
  const handleChange = () => {
    if (mobile.length == 10) {
      setloading(true)
      login(mobile, setloading, Routenavigation)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.bgCircle1} />
        <View style={styles.bgCircle2} />
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logo/MainLogo.png')} className='h-32 w-32 rounded-full' />
          </View>
          <Text style={styles.title}>Welcome to TiffinWala Admin</Text>
          <Text style={styles.subtitle}>Login with your mobile number to continue</Text>
          <View style={styles.inputWrapper}>
            <Icon name="phone" size={20} type="solid" color="#6366F1" />
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              placeholderTextColor="#94A3B8"
              value={mobile}
              onChangeText={(text) => inputValidation(text)}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
          <Text style={styles.infoText}>We will send you a One Time Password (OTP) to verify your number.</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            className='w-full'
            style={[styles.otpBtn, { opacity: mobile.length === 10 ? 1 : 0.5 }]}
            disabled={mobile.length !== 10}
            onPress={() => handleChange()}
          >
            {loading ? <ActivityIndicator size={'small'} color={"white"} /> : <Text style={styles.otpBtnText}>Send OTP</Text>
            }
          </TouchableOpacity>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 8,
    resizeMode: 'contain',
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
    marginBottom: 28,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    height: 52,
    width: '100%',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#1E293B',
    marginLeft: 12,
    letterSpacing: 1,
  },
  infoText: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 18,
    textAlign: 'center',
  },
  otpBtn: {
    backgroundColor: '#6366F1', // Indigo-500
    borderRadius: 16,
    height: 50,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,

    // iOS shadow
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    // Android elevation
    elevation: 4,
  },

  otpBtnText: {
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

export default LoginScreen; 
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Icon from '../../MainLogo/icon/Icon';
import useLoginApi from '../../hooks/api/Auth/useLoginApi';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const { login } = useLoginApi()
  const Routenavigation = useNavigation()
  const [mobile, setMobile] = useState('');
  const [loading, setloading] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

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
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.logoBackground}>
                <Image
                  source={require('../../assets/logo/MainLogo.png')}
                  style={styles.logoImage}
                />
              </View>
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Admin Portal Access</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <View style={[
                styles.inputWrapper,
                isFocused && styles.inputWrapperFocused,
                mobile.length === 10 && styles.inputWrapperValid
              ]}>
                <View style={styles.inputIcon}>
                  <Icon type={"solid"} name="phone" size={20} color="#FF6B35" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#94A3B8"
                  value={mobile}
                  onChangeText={(text) => inputValidation(text)}
                  keyboardType="phone-pad"
                  maxLength={10}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {mobile.length === 10 && (
                  <View style={styles.validIcon}>
                    <Icon type={"solid"} name="check" size={20} color="#10B981" />
                  </View>
                )}
              </View>
            </View>

            <Text style={styles.infoText}>
              We'll send a One Time Password (OTP) to verify your number
            </Text>
            <TouchableOpacity
              style={[
                styles.otpButton,
                mobile.length !== 10 && styles.otpButtonDisabled
              ]}
              disabled={mobile.length !== 10 || loading}
              onPress={handleChange}
              activeOpacity={0.9}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.otpButtonText}>Send OTP</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Secure Admin Access • TiffinWala
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blueBlur: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1E40AF',
    opacity: 0.05,
  },
  orangeBlur: {
    position: 'absolute',
    bottom: -80,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FF6B35',
    opacity: 0.05,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1E40AF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 2,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  inputWrapperFocused: {
    borderColor: '#1E40AF',
    shadowColor: '#1E40AF',
    shadowOpacity: 0.1,
    elevation: 4,
  },
  inputWrapperValid: {
    borderColor: '#10B981',
  },
  inputIcon: {
    marginRight: 12,
  },
  validIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  infoText: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 18,
  },
  otpButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  otpButtonDisabled: {
    backgroundColor: '#CBD5E1',
    shadowColor: '#64748B',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default LoginScreen;
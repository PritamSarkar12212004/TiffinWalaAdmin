import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ImagePickerCard from '../../components/elements/ImagePickerCard';

const genderOptions = ['Male', 'Female', 'Other'];

const UserProfileSetup = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBio, setUserBio] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    const profileData = {
      userName,
      userImage,
      userEmail,
      userGender,
      userBio,
      userAddress,
    };
    console.log('Profile Data:', profileData);
    // You can add navigation or API call here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Up Your Profile</Text>
      <ImagePickerCard image={userImage} setImage={setUserImage} />
      <TextInput
        style={styles.input}
        placeholder="User Name"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender:</Text>
        {genderOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[styles.genderOption, userGender === option && styles.genderOptionSelected]}
            onPress={() => setUserGender(option)}
          >
            <Text style={[styles.genderText, userGender === option && styles.genderTextSelected]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        value={userBio}
        onChangeText={setUserBio}
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={userAddress}
        onChangeText={setUserAddress}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    color: '#1E293B',
  },
  bioInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    width: '100%',
    maxWidth: 380,
  },
  genderLabel: {
    fontSize: 16,
    color: '#64748B',
    marginRight: 10,
  },
  genderOption: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    marginRight: 10,
    backgroundColor: '#F1F5F9',
  },
  genderOptionSelected: {
    backgroundColor: '#10B98122',
    borderColor: '#10B981',
  },
  genderText: {
    color: '#64748B',
    fontWeight: '600',
  },
  genderTextSelected: {
    color: '#10B981',
  },
  submitBtn: {
    backgroundColor: '#10B981',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginTop: 18,
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
});

export default UserProfileSetup; 
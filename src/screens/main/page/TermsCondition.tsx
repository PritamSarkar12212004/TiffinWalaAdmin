// components/Terms.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PageNavigation from '../../../layout/navigation/PageNavigation';

const TermsCondition = () => {
  return (
    <View className='bg-[#F3F3F3] flex-1 px-3 pt-2"'>
      <PageNavigation route={"Terms & Condition"} />
      <ScrollView className="flex-1 bg-[#F3F3F3] ">
        <View className="bg-[#F3F3F3]  rounded-2xl shadow-md ">

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">1. Introduction</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            Welcome to Tiffin Wala! By using our services, you agree to these terms. Please read them carefully before proceeding.
          </Text>

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">2. Account Responsibility</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device.
          </Text>

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">3. Subscription</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            Subscription plans are prepaid and non-transferable. You can manage or cancel them from your profile.
          </Text>

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">4. Delivery Policy</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            Deliveries are scheduled daily between 12:00 PM to 2:00 PM and 7:00 PM to 9:00 PM. Any delays will be communicated in advance.
          </Text>

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">5. Cancellation & Refund</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            Cancellations done 1 hour before the delivery time are eligible for a full refund. After that, no refund will be processed.
          </Text>

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">6. User Conduct</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            Misuse of the platform, including abuse of customer support or fraudulent activity, may result in account suspension.
          </Text>

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">7. Allergies Disclaimer</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            While we try our best, we do not guarantee allergy-free meals. Users should mention allergies in their profile and double-check with our support.
          </Text>

          <Text className="text-base font-semibold text-[#111E45] mt-4 mb-2">8. Updates to Terms</Text>
          <Text className="text-sm text-[#4B5563] leading-relaxed">
            We may update these terms at any time. Continued use of the service indicates acceptance of the revised terms.
          </Text>

          <Text className="text-sm text-center text-[#6B7280] mt-8">
            Last updated: June 9, 2025
          </Text>
        </View>
      </ScrollView>
    </View>

  );
};

export default TermsCondition;

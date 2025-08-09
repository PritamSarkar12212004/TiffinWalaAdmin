// components/About.tsx
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import PageNavigation from '../../../layout/navigation/PageNavigation';
import ImageConstant from '../../../constant/image/ImageConstant';
const About = () => {
    return (
        <View className="flex-1 bg-white px-4">
            <PageNavigation route={"About"} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Text className="text-3xl font-extrabold text-center text-[#111E45] mb-4">
                    About Tiffin Wala
                </Text>

                {/* Tagline */}
                <Text className="text-base text-center text-[#4B5563] mb-6 px-3">
                    A digital bridge between local tiffin providers and hungry users — fast, easy, and reliable.
                </Text>

                {/* Image */}
                <View className='w-full flex h-52 items-center justify-center'>
                    <Image
                        source={ImageConstant.Logo.Logo}
                        className="w-52 h-52 rounded-2xl mb-6"
                        resizeMode="cover"
                    />
                </View>

                {/* App Purpose */}
                <Text className="text-xl font-bold text-[#111E45] mb-2">What is Tiffin Wala?</Text>
                <Text className="text-sm text-[#4B5563] leading-relaxed mb-4">
                    Tiffin Wala ek modern platform hai jahan par local mess aur tiffin providers apni service ko online laa sakte hain.
                    Users is platform par aasani se available tiffin services ko dekh sakte hain, compare kar sakte hain, aur directly order kar sakte hain.
                    Hamara mission hai ki har student aur working individual ko ek reliable, fast, aur hygienic tiffin solution mile bina kisi extra hassle ke.
                </Text>

                {/* Features */}
                <Text className="text-xl font-bold text-[#111E45] mb-2">Why Choose Tiffin Wala?</Text>
                <View className="space-y-3 mb-6">
                    {[
                        { title: '✅ One Platform, Multiple Providers', desc: 'Easily browse and choose from verified mess & tiffin services.' },
                        { title: '🕒 Fast & Easy Booking', desc: 'Book your meal within seconds with our smooth booking system.' },
                        { title: '🧼 Hygiene & Trust', desc: 'Only verified vendors with proper hygiene practices are onboarded.' },
                        { title: '📍 Location-Based Suggestions', desc: 'Find meals nearby based on your area and timing.' },
                    ].map((item, index) => (
                        <View key={index} className="bg-white p-3 rounded-xl shadow-sm border border-[#E5E7EB]">
                            <Text className="text-base font-semibold text-[#111E45]">{item.title}</Text>
                            <Text className="text-sm text-[#4B5563]">{item.desc}</Text>
                        </View>
                    ))}
                </View>

                {/* Mission */}
                <Text className="text-xl font-bold text-[#111E45] mb-2">Our Mission</Text>
                <Text className="text-sm text-[#4B5563] leading-relaxed mb-4">
                    To simplify access to daily meals for students, workers, and busy individuals by creating a digital space for local tiffin providers to grow and serve better.
                </Text>

                {/* Vision */}
                <Text className="text-xl font-bold text-[#111E45] mb-2">Our Vision</Text>
                <Text className="text-sm text-[#4B5563] leading-relaxed mb-4">
                    A future where no one misses a meal because of inconvenience — where every tiffin service is just a tap away.
                </Text>
            </ScrollView>
        </View>
    );
};

export default About;

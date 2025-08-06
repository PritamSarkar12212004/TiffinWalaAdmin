import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { BlurView } from '@react-native-community/blur';
import deleteStorage from '../../../functions/token/deleteStorage';
import Token from '../../../constant/tokens/Token';
import setStorage from '../../../functions/token/setStorage';
import { userContext } from '../../../util/context/ContextProvider';
import { useNavigation } from '@react-navigation/native';

const SuccessFullModel = ({ AnimationComp, Animation, setUploadStatus }: any) => {
    const { setloading } = userContext()
    const Navigation = useNavigation()
    useEffect(() => {
        setTimeout(() => {
            Promise.all([
                deleteStorage(Token.DataToken.UserProductCount)
            ]).then((res) => {
                console.log(res);
                Promise.all([
                    setStorage(Token.DataToken.UserProductCount, true)
                ]).then(async () => {
                    await setloading(true)
                    await setUploadStatus(null),
                        Navigation.navigate('DashBoard' as never)
                })
            })
        }, 2000);
    }, [])
    return (
        <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={8}
            reducedTransparencyFallbackColor="white"
        >
            {/* Overlay background blur */}
            <View className="items-center justify-center px-6">
                {/* Modal Card */}
                <View className=" h-80 w-full max-w-md bg-white/95 p-8 rounded-3xl shadow-2xl border border-green-200">

                    {/* Animation */}
                    <View className="items-center mb-2">
                        <AnimationComp
                            path={Animation.DoneAnimation}
                            height={180}
                            width={180}
                        />
                    </View>

                    {/* Heading */}
                    <Text className="text-2xl font-extrabold text-green-700 text-center">
                        Success!
                    </Text>

                    {/* Subheading */}
                    <Text className="text-base text-gray-600 text-center mt-2">
                        Your product has been uploaded and is now live.
                    </Text>

                    {/* Tip Box */}
                    <View className="mt-6 bg-green-100/80 backdrop-blur-sm p-4 rounded-xl border border-green-300">
                        <Text className="text-green-800 text-sm font-medium text-center">
                            You can view it in your profile or continue adding more products.
                        </Text>
                    </View>
                </View>
            </View>
        </BlurView>
    );
};

export default SuccessFullModel;

const styles = StyleSheet.create({
    absolute: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
    },
});

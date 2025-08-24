import { View, Text, FlatList } from 'react-native';
import React from 'react';
import PageNavigation from '../../../layout/navigation/PageNavigation';
import { userContext } from '../../../util/context/ContextProvider';

const FollowerPage = (): React.JSX.Element => {
    const { adminDatabase } = userContext()
    console.log(adminDatabase)
    return (
        <View className="flex-1 bg-white px-2">
            <PageNavigation route={"Followers"} />
            <FlatList />
        </View >
    );
};

export default FollowerPage;
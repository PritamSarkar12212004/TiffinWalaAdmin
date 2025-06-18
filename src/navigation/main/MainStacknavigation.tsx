import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CommentScreen from '../../screens/main/page/CommentScreen';
import DashBoardWraper from '../../layout/wraper/DashBoardWraper';
import ItemList from '../../screens/main/page/ItemList';
const Stack = createStackNavigator();
const MainStacknavigation = () => {
    return (
        <DashBoardWraper>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="comment" component={CommentScreen} options={
                    {
                        animation: 'slide_from_bottom'
                    }
                } />
                <Stack.Screen name="ItemList" component={ItemList} options={
                    {
                        animation: 'slide_from_bottom'
                    }
                } />
            </Stack.Navigator>
        </DashBoardWraper>
    )
}

export default MainStacknavigation
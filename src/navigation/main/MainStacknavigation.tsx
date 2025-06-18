import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CommentScreen from '../../screens/main/page/CommentScreen';
import ItemList from '../../screens/main/page/ItemList';
import SubpageWraper from '../../layout/wraper/SubpageWraper';
import About from '../../screens/main/page/About';
import TermsCondition from '../../screens/main/page/TermsCondition';
const Stack = createStackNavigator();
const MainStacknavigation = () => {
    return (
        <SubpageWraper>
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
                <Stack.Screen name="About" component={About} options={
                    {
                        animation: 'slide_from_bottom'
                    }
                } />
                <Stack.Screen name="TermsCondition" component={TermsCondition} options={
                    {
                        animation: 'slide_from_bottom'
                    }
                } />
            </Stack.Navigator>
        </SubpageWraper>
    )
}

export default MainStacknavigation
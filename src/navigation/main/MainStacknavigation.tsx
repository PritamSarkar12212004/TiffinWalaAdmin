import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import CommentScreen from '../../screens/main/page/CommentScreen';
import ItemList from '../../screens/main/page/ItemList';
import SubpageWraper from '../../layout/wraper/SubpageWraper';
import About from '../../screens/main/page/About';
import TermsCondition from '../../screens/main/page/TermsCondition';
import PersonalInfo from '../../screens/main/page/PersonalInfo';
import ProfileEdit from '../../screens/main/page/ProfileEdit';
import SettingsScreen from '../../screens/main/page/SettingsScreen';
import PrivacySettingsScreen from '../../screens/main/page/PrivacySettingsScreen';
import HelpCenterScreen from '../../screens/main/page/HelpCenterScreen';
import ContactSupportScreen from '../../screens/main/page/ContactSupportScreen';

const Stack = createStackNavigator();
const MainStacknavigation = () => {
    return (
        <SubpageWraper>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="comment" component={CommentScreen} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="ItemList" component={ItemList} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="About" component={About} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="TermsCondition" component={TermsCondition} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="Settings" component={SettingsScreen} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
               
                <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="ContactSupport" component={ContactSupportScreen} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
            </Stack.Navigator>
        </SubpageWraper>
    )
}

export default MainStacknavigation
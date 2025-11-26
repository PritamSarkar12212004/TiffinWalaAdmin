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
import HelpCenterScreen from '../../screens/main/page/HelpCenterScreen';
import ContactSupportScreen from '../../screens/main/page/ContactSupportScreen';
import PrivacySettingsScreen from '../../screens/main/page/subpage/PrivacySettingsScreen';
import HelpArtical from '../../screens/main/page/subpage/HelpArtical';
import ViewProductDetiles from '../../screens/main/page/ViewProductDetiles';
import ViewProductAnalazeDetiles from '../../screens/main/page/ViewProductAnalazeDetiles';
import FollowerPage from '../../screens/main/page/FollowerPage';
import UploadProduct from '../../screens/main/UploadProduct';
import MapHelper from '../../screens/main/helper/MapHelper';
import PhoneNumberChange from '../../screens/main/helper/PhoneNumberChange';
import FetchImageScreen from '../../screens/main/helper/FetchImageScreen';

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
                <Stack.Screen name="UploadProduct" component={UploadProduct} options={
                    {
                        animation: 'slide_from_bottom'
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
                <Stack.Screen name="HelpArtical" component={HelpArtical} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="ViewProductDetiles" component={ViewProductDetiles} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="ViewProductAnalazeDetiles" component={ViewProductAnalazeDetiles} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="FollowerPage" component={FollowerPage} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="MapHelper" component={MapHelper} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="PhoneNumberChange" component={PhoneNumberChange} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
                <Stack.Screen name="FetchImageScreen" component={FetchImageScreen} options={
                    {
                        animation: 'slide_from_right'
                    }
                } />
            </Stack.Navigator>
        </SubpageWraper>
    )
}

export default MainStacknavigation
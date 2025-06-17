import React, {useEffect, useState} from 'react';
import {Dimensions, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styled from 'styled-components';
import { tabBarScreenOptions, tabBarOptions, BottomTabBar } from '@/views/Components/TabBar';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {Platform} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import {enableScreens} from 'react-native-screens';
import SignIn from '@/views/SignIn/SignIn';
import Home from '@/views/Home';
import Email from '@/views/Email';
import Calendar from '@/views/Calendar';
import Notes from '@/views/Notes';
import Workflow from '@/views/Workflow';
import Notifications from '@/views/Notifications';
import Menu from '@/views/Menu';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

enableScreens();
export const iosModalOptions = ({route, navigation}) => ({
  ...TransitionPresets.ModalPresentationIOS,
  cardOverlayEnabled: true,
  gestureEnabled: true,
  headerShown: false,
  headerStatusBarHeight: navigation.dangerouslyGetState().routes.indexOf(route) > 0 ? 0 : undefined,
});

const Tab = createBottomTabNavigator();
const Router: React.FC = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
    setInitialized(true);

    StatusBar.setBarStyle("dark-content");
    if (Platform.OS === 'android') StatusBar.setBackgroundColor("#FFEC00");
    StatusBar.setHidden(true);
  }, []);

  if (!initialized) return null;
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FFEC00"/>
      <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Main">
          {() =>
            <Drawer.Navigator
              drawerContent={props => <Menu {...props} />} drawerStyle={{width: 170}}>
              <Drawer.Screen name="Home">
                {() =>
                  <Stack.Navigator screenOptions={iosModalOptions}>
                    <Stack.Screen name="Home">
                      {() =>
                        <TabNavigatorContainer>
                          <Tab.Navigator
                            tabBar={props => <BottomTabBar {...props}/>}
                            tabBarOptions={tabBarOptions}
                            initialRouteName="ALERTS"
                            screenOptions={tabBarScreenOptions}>

                            <Tab.Screen name="Email">
                              {() =>
                                <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
                                  <Stack.Screen name="Email" component={Email}/>
                                </Stack.Navigator>}
                            </Tab.Screen>
                            <Tab.Screen name="Calendar" component={Calendar} />
                            <Tab.Screen name="Notes" component={Notes} />
                            <Tab.Screen name="Workflow" component={Workflow} />
                            <Tab.Screen name="Notifications" component={Notifications} />
                          </Tab.Navigator>
                        </TabNavigatorContainer>
                      }
                    </Stack.Screen>
                  </Stack.Navigator>}
              </Drawer.Screen>
            </Drawer.Navigator>
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Router;

const TabNavigatorContainer = styled.View`
  flex: 1;
`
